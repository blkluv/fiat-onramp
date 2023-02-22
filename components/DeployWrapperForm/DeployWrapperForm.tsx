import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios, { AxiosRequestConfig } from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { allChains } from "wagmi";
import shortenAddress from "../../lib/shortenAddress";
import Button from "../Button";
import DeployWrapperButton from "../DeployWrapperButton";
import Spinner from "../Spinner";

const DeployWrapperForm = ({ publicKey, setDeploymentStep }: any) => {
  const [contractAddress, setContractAddress] = useState("");
  const [matchingContracts, setMatchingContracts] = useState([]);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onClick = async (e: any) => {
    setLoading(true);
    e.preventDefault();
    console.log("contract address", contractAddress);
    const { data } = await axios.get("/api/getContractInfo", {
      params: { contractAddress },
    } as AxiosRequestConfig);
    const { matches } = data;
    console.log("matches", matches);
    setMatchingContracts(matches);
    setLoading(false);
  };

  const handleChange = (e: any) => {
    setContractAddress(e.target.value);
  };

  return (
    <main
      style={{ backgroundImage: "url('/images/bg.png')" }}
      className="w-screen min-h-screen bg-cover"
    >
      <form
        className="flex flex-col justify-center items-center gap-10 w-[90vw] h-[85vh] "
        onSubmit={onClick}
      >
        {matchingContracts.length > 0 ? (
          <div className="flex flex-col gap-5">
            <div className="text-center text-xl">
              Results for {shortenAddress(contractAddress)}
            </div>
            {matchingContracts.map((contract: any) => {
              const myChain = allChains.find(
                (chain) => contract.chainId === chain.id
              );
              return (
                <Button key={contract?.name}>
                  {contract?.name} - {myChain?.name}
                </Button>
              );
            })}
            <Button onClick={() => setMatchingContracts([])}>try again</Button>

            <Button
              onClick={(e: any) => router.push("https://twitter.com/decentxyz")}
            >
              get help
            </Button>
          </div>
        ) : (
          <div className="flex flex-col justify-center items-center gap-10">
            <div>
              <p className="font-header">Your Contract Address</p>
              <input
                className="border border-black text-black rounded-lg p-4 w-[400px]"
                onChange={handleChange}
              />
            </div>
            <Button onClick={onClick} type="submit" disabled={loading}>
              {loading ? (
                <Spinner width={20} height={20} color="black" />
              ) : (
                "Verify"
              )}
            </Button>
          </div>
        )}
      </form>
      <div className="min-h-screen grid md:grid-cols-2 grid-cols-1">
        <div className="flex flex-wrap items-center">
          <div className="space-y-8">
            <h1>Project Title or Skeleton</h1>
            <p className="w-2/3">Project Description</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center">
          <div className="space-y-8">
            Public Key: {shortenAddress(publicKey as string)}
            <p>Price: </p>
          </div>
        </div>

        <DeployWrapperButton setDeploymentStep={setDeploymentStep} />
      </div>
    </main>
  );
};

export default DeployWrapperForm;
