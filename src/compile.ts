import path from 'path'
import fs from 'fs'
import solc from 'solc'

const inboxPath = path.resolve(__dirname, 'contracts', 'Inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf-8')

const compiled = solc.compile<':Inbox'>(source, 1)

const contracts = {
    inbox: compiled.contracts[':Inbox']
}

export default contracts
