require('dotenv').config();
const ethers = require('ethers');

// Get Alchemy API Key
const API_KEY = process.env.API_KEY;

// Define an Alchemy Provider
const provider = new ethers.AlchemyProvider('sepolia', API_KEY)

// Contract ABI stuff
const contract = require("../../artifacts/contracts/MyNFT.sol/MyNFT.json");
// console.log(JSON.stringify(contract.abi));

// Create a signer
const privateKey = process.env.PRIVATE_KEY
const signer = new ethers.Wallet(privateKey, provider)

// Get contract ABI and address
const abi = contract.abi

// Create a contract instance
const myNftContract = new ethers.Contract(process.env.CONTRACT_ADDR, abi, signer)

// Call mintNFT function
const mintNFT = async () => {
    let nftTxn = await myNftContract.mintNFT(signer.address, process.env.TOKEN_URI)
    await nftTxn.wait()
    console.log(`NFT Minted! Check it out at: https://sepolia.etherscan.io/tx/${nftTxn.hash}`)
}

mintNFT()
    .then(() => process.exit(0))
    .catch((error) => {
        console.error(error);
        process.exit(1);
    });