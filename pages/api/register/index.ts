import registerCrossmint from "../../../lib/registerCrossmint";

export default async function handler(req: any, res: any) {
    const {address, chainId, name} = req.query
    const response = await registerCrossmint(address, chainId, name)
    res.status(200).json(response)
}