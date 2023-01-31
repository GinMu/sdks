/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../common";
import type {
  UniswapV3Executor,
  UniswapV3ExecutorInterface,
} from "../UniswapV3Executor";

const _abi = [
  {
    inputs: [
      {
        internalType: "address",
        name: "_swapRouter",
        type: "address",
      },
      {
        internalType: "address",
        name: "_owner",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "user",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "OwnerUpdated",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "contract ERC20",
        name: "token",
        type: "address",
      },
    ],
    name: "claimTokens",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "owner",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        components: [
          {
            components: [
              {
                internalType: "address",
                name: "reactor",
                type: "address",
              },
              {
                internalType: "address",
                name: "offerer",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "nonce",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "deadline",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "validationContract",
                type: "address",
              },
              {
                internalType: "bytes",
                name: "validationData",
                type: "bytes",
              },
            ],
            internalType: "struct OrderInfo",
            name: "info",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "uint256",
                name: "maxAmount",
                type: "uint256",
              },
            ],
            internalType: "struct InputToken",
            name: "input",
            type: "tuple",
          },
          {
            components: [
              {
                internalType: "address",
                name: "token",
                type: "address",
              },
              {
                internalType: "uint256",
                name: "amount",
                type: "uint256",
              },
              {
                internalType: "address",
                name: "recipient",
                type: "address",
              },
              {
                internalType: "bool",
                name: "isFeeOutput",
                type: "bool",
              },
            ],
            internalType: "struct OutputToken[]",
            name: "outputs",
            type: "tuple[]",
          },
          {
            internalType: "bytes",
            name: "sig",
            type: "bytes",
          },
          {
            internalType: "bytes32",
            name: "hash",
            type: "bytes32",
          },
        ],
        internalType: "struct ResolvedOrder[]",
        name: "resolvedOrders",
        type: "tuple[]",
      },
      {
        internalType: "address",
        name: "",
        type: "address",
      },
      {
        internalType: "bytes",
        name: "path",
        type: "bytes",
      },
    ],
    name: "reactorCallback",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "newOwner",
        type: "address",
      },
    ],
    name: "setOwner",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "swapRouter",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
] as const;

const _bytecode =
  "0x60a060405234801561001057600080fd5b50604051610d88380380610d8883398101604081905261002f916100a6565b600080546001600160a01b0319166001600160a01b03831690811782556040518392907f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d76908290a350506001600160a01b03166080526100d9565b80516001600160a01b03811681146100a157600080fd5b919050565b600080604083850312156100b957600080fd5b6100c28361008a565b91506100d06020840161008a565b90509250929050565b608051610c806101086000396000818160e20152818161037a0152818161043501526104d60152610c806000f3fe608060405234801561001057600080fd5b50600436106100675760003560e01c80638da5cb5b116100505780638da5cb5b14610094578063c31c9c07146100dd578063df8de3e71461010457600080fd5b806313af40351461006c5780632213f3a914610081575b600080fd5b61007f61007a366004610970565b610117565b005b61007f61008f3660046109dd565b61020d565b6000546100b49073ffffffffffffffffffffffffffffffffffffffff1681565b60405173ffffffffffffffffffffffffffffffffffffffff909116815260200160405180910390f35b6100b47f000000000000000000000000000000000000000000000000000000000000000081565b61007f610112366004610970565b610743565b60005473ffffffffffffffffffffffffffffffffffffffff16331461019d576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f554e415554484f52495a4544000000000000000000000000000000000000000060448201526064015b60405180910390fd5b600080547fffffffffffffffffffffffff00000000000000000000000000000000000000001673ffffffffffffffffffffffffffffffffffffffff83169081178255604051909133917f8292fce18fa69edf4db7b94ea2e58241df0ae57f97e0a6c9b29067028bf92d769190a350565b60008585600081811061022257610222610a8f565b90506020028101906102349190610abe565b610245906040810190602001610970565b6040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015290915060009073ffffffffffffffffffffffffffffffffffffffff8316906370a0823190602401602060405180830381865afa1580156102b5573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906102d99190610afc565b90506000878760008181106102f0576102f0610a8f565b90506020028101906103029190610abe565b610310906080810190610b15565b600081811061032157610321610a8f565b6103379260206080909202019081019150610970565b6040517fdd62ed3e00000000000000000000000000000000000000000000000000000000815230600482015273ffffffffffffffffffffffffffffffffffffffff7f000000000000000000000000000000000000000000000000000000000000000081166024830152919250839185169063dd62ed3e90604401602060405180830381865afa1580156103ce573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103f29190610afc565b10156104d2576040517f095ea7b300000000000000000000000000000000000000000000000000000000815273ffffffffffffffffffffffffffffffffffffffff7f0000000000000000000000000000000000000000000000000000000000000000811660048301527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff602483015284169063095ea7b3906044016020604051808303816000875af11580156104ac573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104d09190610b7d565b505b60007f000000000000000000000000000000000000000000000000000000000000000073ffffffffffffffffffffffffffffffffffffffff1663b858183f604051806080016040528089898080601f01602080910402602001604051908101604052809392919081815260200183838082843760009201829052509385525050306020840152506040808301899052606090920152517fffffffff0000000000000000000000000000000000000000000000000000000060e084901b16815261059e9190600401610b9f565b6020604051808303816000875af11580156105bd573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906105e19190610afc565b6040517fdd62ed3e000000000000000000000000000000000000000000000000000000008152306004820152336024820152909150819073ffffffffffffffffffffffffffffffffffffffff84169063dd62ed3e90604401602060405180830381865afa158015610656573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061067a9190610afc565b1015610738576040517f095ea7b30000000000000000000000000000000000000000000000000000000081523360048201527fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff602482015273ffffffffffffffffffffffffffffffffffffffff83169063095ea7b3906044016020604051808303816000875af1158015610712573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107369190610b7d565b505b505050505050505050565b60005473ffffffffffffffffffffffffffffffffffffffff1633146107c4576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600c60248201527f554e415554484f52495a454400000000000000000000000000000000000000006044820152606401610194565b6000546040517f70a0823100000000000000000000000000000000000000000000000000000000815230600482015261087c9173ffffffffffffffffffffffffffffffffffffffff90811691908416906370a0823190602401602060405180830381865afa15801561083a573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061085e9190610afc565b73ffffffffffffffffffffffffffffffffffffffff8416919061087f565b50565b60006040517fa9059cbb000000000000000000000000000000000000000000000000000000008152836004820152826024820152602060006044836000895af13d15601f3d1160016000511416171691505080610938576040517f08c379a000000000000000000000000000000000000000000000000000000000815260206004820152600f60248201527f5452414e534645525f4641494c454400000000000000000000000000000000006044820152606401610194565b50505050565b73ffffffffffffffffffffffffffffffffffffffff8116811461087c57600080fd5b803561096b8161093e565b919050565b60006020828403121561098257600080fd5b813561098d8161093e565b9392505050565b60008083601f8401126109a657600080fd5b50813567ffffffffffffffff8111156109be57600080fd5b6020830191508360208285010111156109d657600080fd5b9250929050565b6000806000806000606086880312156109f557600080fd5b853567ffffffffffffffff80821115610a0d57600080fd5b818801915088601f830112610a2157600080fd5b813581811115610a3057600080fd5b8960208260051b8501011115610a4557600080fd5b60208301975080965050610a5b60208901610960565b94506040880135915080821115610a7157600080fd5b50610a7e88828901610994565b969995985093965092949392505050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052603260045260246000fd5b600082357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff21833603018112610af257600080fd5b9190910192915050565b600060208284031215610b0e57600080fd5b5051919050565b60008083357fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe1843603018112610b4a57600080fd5b83018035915067ffffffffffffffff821115610b6557600080fd5b6020019150600781901b36038213156109d657600080fd5b600060208284031215610b8f57600080fd5b8151801515811461098d57600080fd5b60006020808352835160808285015280518060a086015260005b81811015610bd55782810184015186820160c001528301610bb9565b50600060c082870101529185015173ffffffffffffffffffffffffffffffffffffffff8116604086015291604086015160608601526060860151608086015260c07fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffe0601f83011686010193505050509291505056fea264697066735822122090ab64c546d2db5e3d35f0c7c1b5b98467cbc29b67746853b1f1f3eeae29b1c264736f6c63430008110033";

type UniswapV3ExecutorConstructorParams =
  | [signer?: Signer]
  | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (
  xs: UniswapV3ExecutorConstructorParams
): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class UniswapV3Executor__factory extends ContractFactory {
  constructor(...args: UniswapV3ExecutorConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _swapRouter: PromiseOrValue<string>,
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<UniswapV3Executor> {
    return super.deploy(
      _swapRouter,
      _owner,
      overrides || {}
    ) as Promise<UniswapV3Executor>;
  }
  override getDeployTransaction(
    _swapRouter: PromiseOrValue<string>,
    _owner: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_swapRouter, _owner, overrides || {});
  }
  override attach(address: string): UniswapV3Executor {
    return super.attach(address) as UniswapV3Executor;
  }
  override connect(signer: Signer): UniswapV3Executor__factory {
    return super.connect(signer) as UniswapV3Executor__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): UniswapV3ExecutorInterface {
    return new utils.Interface(_abi) as UniswapV3ExecutorInterface;
  }
  static connect(
    address: string,
    signerOrProvider: Signer | Provider
  ): UniswapV3Executor {
    return new Contract(address, _abi, signerOrProvider) as UniswapV3Executor;
  }
}
