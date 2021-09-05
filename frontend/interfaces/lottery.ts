import Web3 from 'web3'
import type { AbiItem } from 'web3-utils'
import { Contract } from '../@types/web3-eth-contract'

export type LotteryContract = Contract<'enter' | 'random' | 'pickWinner' | 'getPlayers' | 'manager'>

const contractAddress = '0x9Db8bCD6EE9D6Ba96397B7AF99EA13a19f8b8912'

const abi: AbiItem[] = [
    {
        'constant': true,
        'inputs': [],
        'name': 'manager',
        'outputs': [
            {
                'name': '',
                'type': 'address'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': false,
        'inputs': [],
        'name': 'pickWinner',
        'outputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [],
        'name': 'getPlayers',
        'outputs': [
            {
                'name': '',
                'type': 'address[]'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'constant': false,
        'inputs': [],
        'name': 'enter',
        'outputs': [],
        'payable': true,
        'stateMutability': 'payable',
        'type': 'function'
    },
    {
        'constant': true,
        'inputs': [
            {
                'name': '',
                'type': 'uint256'
            }
        ],
        'name': 'players',
        'outputs': [
            {
                'name': '',
                'type': 'address'
            }
        ],
        'payable': false,
        'stateMutability': 'view',
        'type': 'function'
    },
    {
        'inputs': [],
        'payable': false,
        'stateMutability': 'nonpayable',
        'type': 'constructor'
    }
]

const getLotteryContract = (web3: Web3): LotteryContract => new web3.eth.Contract(abi, contractAddress) as unknown as LotteryContract

export default getLotteryContract
