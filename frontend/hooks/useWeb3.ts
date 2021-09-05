import { useEffect, useState } from 'react'
import Web3 from 'web3'

const useWeb3 = (): Web3 | undefined => {
    const [web3, setWeb3] = useState<Web3>()
    useEffect(() => {
        setWeb3(new Web3(window.ethereum))
    }, [])

    return web3
}




export default useWeb3