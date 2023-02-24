import { DecentSDK, edition } from "@decent.xyz/sdk"
import getDefaultProvider from "../../../lib/getDefaultProvider";

export default async function handler(req: any, res: any) {
    const {contractAddress} = req.query

    const matches = await searchForContractOnChains(contractAddress)
    
    res.status(200).json({  contractAddress, matches })
}

const searchForContractOnChains = async(address: string) => {
    // const mainnets = [1, 137] TODO: deploy on mainnet
    const testnets = [5, 80001]
    const chains = [...testnets]
    const matches = []
    for(let i = 0; i < chains.length; i++) {
        const chainId = chains[i]
        const provider = getDefaultProvider(chainId);
        const sdk = new DecentSDK(chains[i], provider);
        const contract = await edition.getContract(sdk, address)
        try {
            const name = await contract.name()
            matches.push({name, chainId})
        } catch(e) {
            console.error(e)
        }
    }
    return matches
}