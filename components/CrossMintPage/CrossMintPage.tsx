import type { NextPage } from "next";
import SeoHead from "../SeoHead";
import Footer from "../Footer";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import { useRouter } from "next/router";
import getClientId from "../../lib/getClientId";
import { useEffect, useState } from "react";
import axios, { AxiosRequestConfig } from "axios";
import { BigNumber, ethers } from "ethers";

const CrossMintPage: NextPage = () => {
  const router = useRouter();
  const { chainId, recipient, contractAddress } = router.query;
  const [contractInfo, setContractInfo] = useState({} as any);
  const [ethPrice, setEthPrice] = useState(0);

  const getEthPrice = async () => {
    let response;
    try {
      response = await axios.get("/api/getEthPrice");
    } catch (e) {
      console.error(e);
    }
    setEthPrice(response?.data?.USD);
  };

  useEffect(() => {
    const init = async () => {
      const { data } = await axios.get("/api/getContractInfo", {
        params: {
          contractAddress: contractAddress,
          chainId: chainId,
        },
      } as AxiosRequestConfig);

      data.totalSupply = BigNumber.from(data?.totalSupply);
      data.maxSupply = BigNumber.from(data?.maxSupply);
      data.available = data.maxSupply.sub(data.totalSupply);

      setContractInfo(data);
    };

    if (!contractAddress || !chainId) return;
    init();
    getEthPrice();
  }, [contractAddress, chainId]);

  const price = contractInfo?.tokenPrice
    ? ethers.utils.formatEther(contractInfo?.tokenPrice).toString()
    : "0";

  return (
    <div>
      <SeoHead />
      {contractInfo?.name && (
        <div className="flex flex-col w-screen justify-center h-[90vh] border border-black-500 p-10 gap-10">
          <div className="text-4xl text-center">{contractInfo?.name}</div>
          <div className="text-4xl text-center">
            ${(ethPrice * parseFloat(price)).toFixed(2)}
          </div>
          <div className="text-2xl text-center">
            {contractInfo?.available?.toString() === "0"
              ? "sold out"
              : `${contractInfo?.available?.toString?.()} available to buy`}
          </div>
          <CrossmintPayButton
            clientId={getClientId(Number(chainId)) as string}
            environment="staging"
            mintTo={recipient as string}
            mintConfig={{
              type: "erc-721",
              totalPrice: price,
              _quantity: 1,
              _to: recipient as string,
              _target: contractAddress,
            }}
          />
        </div>
      )}

      <Footer />
    </div>
  );
};

export default CrossMintPage;
