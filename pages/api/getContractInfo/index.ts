import { DecentSDK, edition } from "@decent.xyz/sdk"
import getDefaultProvider from "../../../lib/getDefaultProvider";

export default async function handler(req: any, res: any) {
    const {contractAddress, chainId} = req.query
    const response = await getContract(contractAddress, chainId)
    res.status(200).json(response)
}

const getContract = async(address: string, chainId: string) => {
    const provider = getDefaultProvider(Number(chainId));
    const sdk = new DecentSDK(Number(chainId), provider);
    const contract = await edition.getContract(sdk, address)
    try {
        const name = await contract.name()
        const totalSupply = await contract.totalSupply()
        const maxSupply = await contract.MAX_TOKENS()
        const tokenPrice = await contract.tokenPrice()
        return {name, totalSupply: totalSupply.toString(), maxSupply: maxSupply.toString(), tokenPrice: tokenPrice.toString()}
    } catch(e) {
        console.error(e)
    }
}