import { DecentSDK, edition } from "@decent.xyz/sdk"
import getDefaultProvider from "../../../lib/getDefaultProvider";

export default async function handler(req: any, res: any) {
    const {contractAddress} = req.query

    const matches = await searchForContractOnChains(contractAddress)
    
    res.status(200).json({  contractAddress, matches })
}

const searchForContractOnChains = async(address: string) => {
    const chains = [1, 137, 5, 80001]
    const matches = []
    for(let i = 0; i < chains.length; i++) {
        const chainId = chains[i]
        const provider = getDefaultProvider(chainId);
        const sdk = new DecentSDK(chains[i], provider);
        const contract = await edition.getContract(sdk, address)
        try {
            const name = await contract.name()
            console.log(chainId, name)
            matches.push({name, chainId})
        } catch(e) {
            console.log("NO CONTRACT FOUND ON CHAIN", chainId)
        }
    }
    return matches
}