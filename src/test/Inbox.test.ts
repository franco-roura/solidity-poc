import assert from 'assert'
import ganache from 'ganache-cli'
import Web3 from 'web3'
import { Contract } from 'src/@types/web3-eth-contract'

import contracts from 'src/compile'

const web3 = new Web3(ganache.provider())

let accounts: string[]
let inbox: Contract<'message' | 'setMessage'>
const defaultMessage = 'Hello world 😂'

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()

    // Use one of those accounts to deploy
    // the contract
    const contract = new web3.eth.Contract(
        JSON.parse(contracts.inbox.interface)
    )
    const deployedContract = contract.deploy({
        data: contracts.inbox.bytecode,
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

    it('can change the message', async () => {
        const newMessage = 'Para bailar la bamba se necesita una poca de gracia.'
        await inbox.methods.setMessage(newMessage).send({
            from: accounts[1]
        })
        const message = await inbox.methods.message().call()
        assert.strictEqual(message, newMessage)
    })
})