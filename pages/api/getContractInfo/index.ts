import { DecentSDK, edition } from "@decent.xyz/sdk"
import getDefaultProvider from "../../../lib/getDefaultProvider";

export default async function handler(req: any, res: any) {
    const provider = getDefaultProvider(Number(process.env.NEXT_PUBLIC_CHAIN_ID));
    const chainId = Number(process.env.NEXT_PUBLIC_CHAIN_ID);
    const sdk = new DecentSDK(chainId, provider);
    const contract = await edition.getContract(sdk, process.env.NEXT_PUBLIC_CONTRACT_ADDRESS as string)
    const supplyMax = await contract.maxTokenPurchase();
    const supply = await contract.totalSupply();
    const name = await contract.name();
    res.status(200).json({ name, contract: contract.address, supplyMax, supply  })
}