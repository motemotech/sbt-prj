import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import Navigation from "./Navbar";
//import Home from "./Home.js";
import Create from "./Create.js"
import MySoul from "./MySoul.js"
import sbtAbi from '../contractsData/ERC4973.json'
import sbtAddress from '../contractsData/ERC4973-address.json'
import { useState } from 'react'
import { ethers } from "ethers"
import { Spinner } from 'react-bootstrap'

import './App.css';

function App() {
    const [loading, setLoading] = useState(true)
    const [account, setAccount] = useState(null)
    const [erc4973, setERC4973] = useState({})
    // MetaMask Login/Connect
    const web3Handler = async () => {
        const accounts = await window.ethereum.request({ method: 'eth_requestAccounts' });
        setAccount(account[0])
        // Get provider from Metamask
        const provider = new ethers.providers.Web3Provider(window.ethereum)
        // Set signer
        const signer = provider.getSigner()

        window.ethereum.on('chainChanged', (chainId) => {
            window.location.reload();
        })

        window.ethereum.on('accountsChanged', async function (accounts) {
            setAccount(account[0])
            await web3Handler()
        })
        loadContracts(signer)
    }
    const loadContracts = async (signer) => {
        // Get deployed copies of contracts
        const erc4973 = new ethers.Contract(sbtAddress.address, sbtAbi.abi, signer)
        setERC4973(erc4973)
        setLoading(false)
    }

    return (
        <BrowserRouter>
            <div className="App">
                <>
                    <Navigation web3Handler={web3Handler} account={account} />
                </>
                <div>
                    {loading ? (
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '80vh' }}>
                            <Spinner animation="border" style={{ display: 'flex' }} />
                            <p className="mx-3 my-0">Awaiting Metamask Connection...</p>
                        </div>
                    ) : (
                        <Routes>
                            <Route path="/" element={
                                <Home erc4973={erc4973} />
                            } />
                            <Route path="/create" element={
                                <Create erc4973={erc4973} />
                            } />
                            <Route path="/mySoul" elemnt={
                                <MySoul erc4973={erc4973} account={account} />
                            } />
                        </Routes>
                    )}
                </div>
            </div>
        </BrowserRouter>
    );
}

export default App;