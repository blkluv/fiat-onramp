import axios, { AxiosRequestConfig } from 'axios';
// import abi from "./adapter-abi.json"



const registerCrossmint = async (address: string, chainId: number, name: string) => {
  const chainName = chainId == 137 || chainId == 80001 ? "polygon": "ethereum"
    const body = {
        "chain": chainName,
        "contractType": "erc-721",
        "args": {
          "contractAddress": address,
          "abi": [ { "inputs": [{ "internalType": "address", "name": "_erc721", "type": "address" } ], "stateMutability": "nonpayable", "type": "constructor" }, { "inputs": [], "name": "erc721", "outputs": [ { "internalType": "contract IDCNT721A", "name": "", "type": "address" } ], "stateMutability": "view", "type": "function" }, { "inputs": [ { "internalType": "uint256", "name": "_quantity", "type": "uint256" }, { "internalType": "address", "name": "_to", "type": "address" } ], "name": "mint", "outputs": [], "stateMutability": "payable", "type": "function" }, { "inputs": [ { "internalType": "address", "name": "_operator", "type": "address" }, { "internalType": "address", "name": "_from", "type": "address" }, { "internalType": "uint256", "name": "_tokenId", "type": "uint256" }, { "internalType": "bytes", "name": "_data", "type": "bytes" } ], "name": "onERC721Received", "outputs": [ { "internalType": "bytes4", "name": "", "type": "bytes4" } ], "stateMutability": "pure", "type": "function" }, { "inputs": [], "name": "totalSupply", "outputs": [ { "internalType": "uint256", "name": "start", "type": "uint256" } ], "stateMutability": "view", "type": "function" } ],
          "toParamName": "_to",
          "quantityParamName": "_quantity",
          "mintFunctionName": "mint(uint256,address)"
        },
        "metadata": {
          "title": name || "Test Create Collection API",
          "description": "Test Description",
          "imageUrl": "https://www.crossmint.com/_next/image?url=%2Fassets%2Fcrossmint%2Flogo.png&w=48&q=75",
          "social": {
            "twitter": "",
            "discord": ""
          }
        }
    };

    try {
        const response = await axios('https://staging.crossmint.com/api/v1-alpha1/collections', {
            method: 'POST',
            data: body,
            headers: {
              'X-PROJECT-ID': process.env.CROSSMINT_PROJECT_ID,
              'X-CLIENT-SECRET': process.env.CROSSMINT_CLIENT_SECRET,
              'Content-Type': 'application/json'
            }
        } as AxiosRequestConfig);
          
        return response.data
    } catch(e: any) {
      return e.response.data
    }
    
}

export default registerCrossmint