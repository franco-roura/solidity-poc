import assert from 'assert'
import ganache from 'ganache-cli'
import Web3 from 'web3'
import { Contract } from 'src/@types/web3-eth-contract'

import contracts from 'src/compile'

const web3 = new Web3(ganache.provider())

type LotteryContract = Contract<'enter' | 'random' | 'pickWinner' | 'getPlayers'>

let accounts: string[]
let lottery: LotteryContract

beforeEach(async () => {
    // Get a list of all accounts
    accounts = await web3.eth.getAccounts()

    // Use one of those accounts to deploy
    // the contract
    const contract = new web3.eth.Contract(
        JSON.parse(contracts.lottery.interface)
    ) as unknown as LotteryContract
    const deployedContract = contract.deploy({
        data: contracts.lottery.bytecode
    })
    lottery = await deployedContract.send({
        from: accounts[0],
        gas: 1_000_000
    })
})

describe('Lottery', () => {
    it('deploys a contract', () => assert.ok(lottery.options.address))

    it('allows someone to enter', async () => {
        await lottery.methods.enter().send({
            from: accounts[1],
            value: web3.utils.toWei('0.02', 'ether')
        })
        const players = await lottery.methods.getPlayers().call({
            from: accounts[0]
        })
        assert.equal(players.length, 1)
        assert.equal(players[0], accounts[1])
    })

    it('allows multiple accounts to enter', async () => {
        let players
        for (let index = 0; index < 3; index++) {
            const account = accounts[index]
            await lottery.methods.enter().send({
                from: account,
                value: web3.utils.toWei('0.02', 'ether')
            })
            players = await lottery.methods.getPlayers().call({ from: accounts[0] })
            assert.equal(players[index], accounts[index])
        }
        assert.equal(players.length, 3)
    })

    it('requires more than 0.01 ether to enter', async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[0],
                value: web3.utils.toWei('0.01', 'ether')
            })
        } catch (error) {
            return assert(error)
        }
        assert(false)
    })

    it('only lets manager call pickWinner', async () => {
        try {
            await lottery.methods.enter().send({
                from: accounts[1],
                value: web3.utils.toWei('2', 'ether')
            })
            await lottery.methods.pickWinner().send({
                from: accounts[1]
            })
        } catch (error) {
            return assert(error)
        }
        assert(false)
    })

    it('sends money to the winner and resets the players array', async () => {
        await lottery.methods.enter().send({
            from: accounts[0],
            value: web3.utils.toWei('2', 'ether')
        })
        const initialBalance = parseInt(await web3.eth.getBalance(accounts[0]))
        await lottery.methods.pickWinner().send({ from: accounts[0] })
        const finalBalance = parseInt(await web3.eth.getBalance(accounts[0]))

        assert(finalBalance - initialBalance > parseInt(web3.utils.toWei('1.9', 'ether')))
        const players = await lottery.methods.getPlayers().call({ from: accounts[0] })
        assert.equal(players.length, 0)
    })
})