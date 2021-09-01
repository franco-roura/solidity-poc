import path from 'path'
import fs from 'fs'
import solc from 'solc'

const inboxPath = path.resolve(__dirname, "contracts", 'Inbox.sol')
const source = fs.readFileSync(inboxPath, 'utf-8')

const inboxBuild = solc.compile(source, 1).contracts[':Inbox']
const inboxBuildPath = inboxPath + '.build.json'
fs.writeFileSync(inboxBuildPath, JSON.stringify(inboxBuild, null, 4))

export default inboxBuild