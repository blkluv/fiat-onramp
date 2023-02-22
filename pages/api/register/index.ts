import registerCrossmint from "../../../lib/registerCrossmint";

export default async function handler(req: any, res: any) {
    const {address} = req.query
    await registerCrossmint(address)
    res.status(200).json({ address })
}