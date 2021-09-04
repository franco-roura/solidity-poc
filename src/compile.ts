import path from 'path'
import fs from 'fs'
import solc from 'solc'

const getPath = (fileName: string) => path.resolve(__dirname, 'contracts', fileName)

const inboxPath = getPath('Inbox.sol')
const lotteryPath = getPath('Lottery.sol')

const inboxSource = fs.readFileSync(inboxPath, 'utf-8')
const lotterySource = fs.readFileSync(lotteryPath, 'utf-8')

const contracts = {
    inbox: solc.compile<':Inbox'>(inboxSource, 1).contracts[':Inbox'],
    lottery: solc.compile<':Lottery'>(lotterySource, 1).contracts[':Lottery']
}

export default contracts
