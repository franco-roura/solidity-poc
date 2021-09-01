# Solidity POC

I decided to start learning Solidity so here's a repo for myself to track my own progress.

## Installation

Use [yarn](https://classic.yarnpkg.com/en/docs/install#mac-stable) to install this POC.

```bash
yarn
```

## Usage

```typescript
import ganache from 'ganache-cli'
import Web3 from 'web3'
import { Contract } from 'web3-eth-contract'

import inboxContract from 'src/contracts/Inbox.sol.build.json'

const web3 = new Web3(ganache.provider())
const defaultMessage = 'Hello world 😂'

async function main() {
    const accounts = await web3.eth.getAccounts()
    const contract = new web3.eth.Contract(
        JSON.parse(inboxContract.interface)
    )
    const deployedContract = contract.deploy({
        data: inboxContract.bytecode,
        arguments: [defaultMessage]
    })
    const contractAbi: Contract = await deployedContract.send({
        from: accounts[0],
        gas: 1_000_000
    })

    const message = await contractAbi.methods.message().call()
    console.log(message)
}

main()
```

## Contributing
Pull requests are not welcome. I will probably not read them, you might be better off forking the repo.

## License
[MIT](https://choosealicense.com/licenses/mit/)