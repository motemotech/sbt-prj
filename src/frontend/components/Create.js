import { useState } from 'react'
import { ethers } from "ethers"
import { Row, Form, Button } from 'react-bootstrap'
import { create as ipfsHttpClient } from 'ipfs-http-client'
const client = ipfsHttpClient('https://ipfs.infura.io:5001/api/v0')

const Create = ({ erc4973 }) => {
    const [image, setImage] = useState('')
    const [price, setPrice] = useState(null)
    const [name, setName] = useState('')
    const [description, setDiscription] = useState('')
    const uploadToIPFS = async (event) => {
        event.preventDefault()
        const file = event.target.files[0]
        if (typeof file !== 'undefined') {
            try {
                const result = await client.add(file)
                console.log(result)
                setImage(`https://ipfs.infura.io/ipfs/${result.path}`)
            } catch (error){
                console.log("ipfs image upload error: ", error)
            }
        }
    }
    const createNFT = async () => {
        if (!image || !price || !name || !description)return
        try{
            const result = await client.add(JSON.stringify({image, price, name, description}))
            giveSoul(result)
        } catch(error) {
            console.log("ipfs uri upload error: ", error)
        }
    }
    const giveSoul = async (result) => {
        
    }
}