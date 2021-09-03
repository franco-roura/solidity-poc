import HDWalletProvider from 'truffle-hdwallet-provider'
import Web3 from 'web3'

import contracts from 'src/compile'

const provider = new HDWalletProvider(
    process.env.ACCT_MNEUMONIC,
    process.env.NETWORK_ENDPOINT
)

const web3 = new Web3(provider)

async function deploy() {
    const [account] = await web3.eth.getAccounts()
    console.log('Attempting to deploy from account', account)
    const contract = new web3.eth.Contract(
        JSON.parse(contracts.inbox.interface)
    )
    const deployedContract = contract.deploy({
        data: contracts.inbox.bytecode,
        arguments: ['Initial message 🤪']
    })
    const result = await deployedContract.send({
        gas: 1_000_000,
        gasPrice: '5000000000',
        from: account
    })
    console.log('Contract deployed to', result.options.address)
}

deploy()