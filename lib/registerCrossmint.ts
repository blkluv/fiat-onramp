import axios, { AxiosRequestConfig } from 'axios';
import abi from "./adapter-abi.json"

const registerCrossmint = async (address: string, chainId: number, name: string) => {
  const chainName = chainId == 137 || chainId == 80001 ? "polygon": "ethereum"
    const body = {
        "chain": chainName,
        "contractType": "erc-721",
        "args": {
          "contractAddress": address,
          "abi": abi,
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