import { DecentSDK, edition } from "@decent.xyz/sdk"
import axios from "axios";
import getDefaultProvider from "../../../lib/getDefaultProvider";

export default async function handler(req: any, res: any) {
    const {data} = await getEthPrice()
    res.status(200).json(data)
}

const getEthPrice = async () => {
    let response;
    try {
      response = await axios.get(
        "https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD",
        {
          headers: {
            "X-CMC_PRO_API_KEY": "1b23d28e-e5eb-49be-8c69-cee5ebe86bb9",
          },
        }
      );
    } catch (ex) {
      response = {data: false};
      // error
      console.error(ex);
    }
    return response;
};