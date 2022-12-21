import hre, { ethers } from 'hardhat';
import { expect } from 'chai';
import { BigNumber, Signer } from 'ethers';

import { BlockchainTime } from './utils/time';

import DutchLimitOrderReactorAbi from '../../abis/DutchLimitOrderReactor.json';
import Permit2Abi from '../../abis/Permit2.json';
import MockERC20Abi from '../../abis/MockERC20.json';
import DirectTakerFillContract from '../../abis/DirectTakerExecutor.json';

import {
  Permit2,
  DutchLimitOrderReactor,
  MockERC20,
} from '../../src/contracts';
import { DutchLimitOrderBuilder } from '../../';

describe('DutchLimitOrder', () => {
  let reactor: DutchLimitOrderReactor;
  let fillContract: string;
  let permit2: Permit2;
  let chainId: number;
  let maker: ethers.Wallet;
  let tokenIn: MockERC20;
  let tokenOut: MockERC20;
  let admin: Signer;
  let taker: Signer;

  before(async () => {
    [admin, taker] = await ethers.getSigners();
    const permit2Factory = await ethers.getContractFactory(
      Permit2Abi.abi,
      Permit2Abi.bytecode
    );
    permit2 = (await permit2Factory.deploy()) as Permit2;

    const reactorFactory = await ethers.getContractFactory(
      DutchLimitOrderReactorAbi.abi,
      DutchLimitOrderReactorAbi.bytecode
    );
    reactor = (await reactorFactory.deploy(
      permit2.address,
      100,
      ethers.constants.AddressZero,
    )) as DutchLimitOrderReactor;

    chainId = hre.network.config.chainId || 1;

    maker = ethers.Wallet.createRandom().connect(ethers.provider);
    await admin.sendTransaction({
      to: await maker.getAddress(),
      value: BigNumber.from(10).pow(18),
    });

    const directTakerFillContractFactory = await ethers.getContractFactory(
      DirectTakerFillContract.abi,
      DirectTakerFillContract.bytecode
    );
    fillContract = (await directTakerFillContractFactory.deploy(await taker.getAddress())).address;

    const tokenFactory = await ethers.getContractFactory(
      MockERC20Abi.abi,
      MockERC20Abi.bytecode
    );
    tokenIn = (await tokenFactory.deploy('TEST A', 'ta', 18)) as MockERC20;

    tokenOut = (await tokenFactory.deploy('TEST B', 'tb', 18)) as MockERC20;

    await tokenIn.mint(
      await maker.getAddress(),
      BigNumber.from(10)
        .pow(18)
        .mul(100)
    );
    await tokenIn
      .connect(maker)
      .approve(permit2.address, ethers.constants.MaxUint256);

    await tokenOut.mint(
      await taker.getAddress(),
      BigNumber.from(10)
        .pow(18)
        .mul(100)
    );
    await tokenOut
      .connect(taker)
      .approve(fillContract, ethers.constants.MaxUint256);
  });

  it('executes a serialized order with no decay', async () => {
    const amount = BigNumber.from(10).pow(18);
    const deadline = await new BlockchainTime().secondsFromNow(1000);
    const order = new DutchLimitOrderBuilder(
      chainId,
      reactor.address,
      permit2.address
    )
      .deadline(deadline)
      .endTime(deadline)
      .startTime(deadline - 100)
      .offerer(await maker.getAddress())
      .nonce(BigNumber.from(100))
      .input({
        token: tokenIn.address,
        startAmount: amount,
        endAmount: amount,
      })
      .output({
        token: tokenOut.address,
        startAmount: amount,
        endAmount: BigNumber.from(10)
          .pow(17)
          .mul(9),
        recipient: await maker.getAddress(),
        isFeeOutput: false,
      })
      .build();

    const { domain, types, values } = order.permitData();
    const signature = await maker._signTypedData(domain, types, values);

    const makerTokenInBalanceBefore = await tokenIn.balanceOf(
      await maker.getAddress()
    );
    const takerTokenInBalanceBefore = await tokenIn.balanceOf(
      await taker.getAddress()
    );
    const makerTokenOutBalanceBefore = await tokenOut.balanceOf(
      await maker.getAddress()
    );
    const takerTokenOutBalanceBefore = await tokenOut.balanceOf(
      await taker.getAddress()
    );

    const res = await reactor.connect(taker).execute(
      { order: order.serialize(), sig: signature },
      fillContract,
      "0x"
    );
    const receipt = await res.wait();
    expect(receipt.status).to.equal(1);
    expect(
      (await tokenIn.balanceOf(await maker.getAddress())).toString()
    ).to.equal(makerTokenInBalanceBefore.sub(amount).toString());
    expect(
      (await tokenIn.balanceOf(await taker.getAddress())).toString()
    ).to.equal(takerTokenInBalanceBefore.add(amount).toString());
    expect(
      (await tokenOut.balanceOf(await maker.getAddress())).toString()
    ).to.equal(makerTokenOutBalanceBefore.add(amount).toString());
    expect(
      (await tokenOut.balanceOf(await taker.getAddress())).toString()
    ).to.equal(takerTokenOutBalanceBefore.sub(amount).toString());
  });

  it('executes a serialized order with decay', async () => {
    const amount = BigNumber.from(10).pow(18);
    const time = new BlockchainTime();
    const deadline = await time.secondsFromNow(1000);
    const order = new DutchLimitOrderBuilder(
      chainId,
      reactor.address,
      permit2.address
    )
      .deadline(deadline)
      .endTime(deadline)
      .startTime(deadline - 2000)
      .nonce(BigNumber.from(101))
      .offerer(await maker.getAddress())
      .input({
        token: tokenIn.address,
        startAmount: amount,
        endAmount: amount,
      })
      .output({
        token: tokenOut.address,
        startAmount: amount,
        endAmount: BigNumber.from(10)
          .pow(17)
          .mul(9),
        recipient: await maker.getAddress(),
        isFeeOutput: false,
      })
      .build();

    const { domain, types, values } = order.permitData();
    const signature = await maker._signTypedData(domain, types, values);

    const makerTokenInBalanceBefore = await tokenIn.balanceOf(
      await maker.getAddress()
    );
    const takerTokenInBalanceBefore = await tokenIn.balanceOf(
      await taker.getAddress()
    );
    const makerTokenOutBalanceBefore = await tokenOut.balanceOf(
      await maker.getAddress()
    );
    const takerTokenOutBalanceBefore = await tokenOut.balanceOf(
      await taker.getAddress()
    );

    const res = await reactor.connect(taker).execute(
      { order: order.serialize(), sig: signature },
      fillContract,
      "0x"
    );
    const receipt = await res.wait();
    expect(receipt.status).to.equal(1);
    expect(
      (await tokenIn.balanceOf(await maker.getAddress())).toString()
    ).to.equal(makerTokenInBalanceBefore.sub(amount).toString());
    expect(
      (await tokenIn.balanceOf(await taker.getAddress())).toString()
    ).to.equal(takerTokenInBalanceBefore.add(amount).toString());
    const amountOut = order.info.outputs[0].startAmount
      .add(order.info.outputs[0].endAmount)
      .div(2);
    // some variance in block timestamp so we need to use a threshold
    expectThreshold(
      await tokenOut.balanceOf(await maker.getAddress()),
      makerTokenOutBalanceBefore.add(amountOut),
      BigNumber.from(10).pow(15)
    );
    expectThreshold(
      await tokenOut.balanceOf(await taker.getAddress()),
      takerTokenOutBalanceBefore.sub(amountOut),
      BigNumber.from(10).pow(15)
    );
  });

  function expectThreshold(
    a: BigNumber,
    b: BigNumber,
    threshold: BigNumber
  ): void {
    if (a.gt(b)) {
      expect(a.sub(b).lte(threshold)).to.equal(true);
    } else {
      expect(b.sub(a).lte(threshold)).to.equal(true);
    }
  }
});
