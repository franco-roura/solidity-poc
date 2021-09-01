import assert from 'assert'
import ganache from 'ganache-cli'
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'

import inboxContract from 'src/contracts/Inbox.sol.build.json'

const web3 = new Web3(ganache.provider())

let accounts;
let inbox: Contract;
const defaultMessage = 'Hello world 😂'

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()

    // Use one of those accounts to deploy
    // the contract
    const contract = new web3.eth.Contract(
        JSON.parse(inboxContract.interface)
    )
    const deployedContract = contract.deploy({
        data: inboxContract.bytecode,
        arguments: [defaultMessage]
    })
    inbox = await deployedContract.send({
        from: accounts[0],
        gas: 1_000_000
    })
})

describe('Inbox', () => {
    it('deploys a contract', () => {
        assert.ok(inbox.options.address)
    })
    it('has a default message', async () => {
        const message = await inbox.methods.message().call()
        assert.strictEqual(message, defaultMessage)
    })
})