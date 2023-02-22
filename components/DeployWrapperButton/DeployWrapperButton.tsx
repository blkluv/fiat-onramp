import { useConnectModal } from "@rainbow-me/rainbowkit";
import axios, { AxiosRequestConfig } from "axios";
import { ContractFactory, Signer } from "ethers";
import { useRouter } from "next/router";
import { useState } from "react";
import { useAccount, useNetwork, useSigner, useSwitchNetwork } from "wagmi";
import abi from "../../lib/adapter-abi.json";
import getCreditCardWrapperBytecode from "../../lib/getCreditCardWrapperBytecode";
import handleTxError from "../../lib/handleTxError";
import Button from "../Button";

const DeployWrapperButton = ({
  children,
  setDeploymentStep,
  wrappedContractAddress,
  chainId,
  name,
}: any) => {
  const { data: signer } = useSigner();
  const { address } = useAccount();
  const { chain } = useNetwork();
  const { openConnectModal } = useConnectModal();
  const { switchNetwork } = useSwitchNetwork();
  const [deploying, setDeploying] = useState(false);
  const router = useRouter();

  const handleClick = async () => {
    if (!signer) {
      openConnectModal?.();
      return;
    }
    if (chain?.id !== chainId) {
      switchNetwork?.(chainId);
      return;
    }
    setDeploying(true);
    await deployContract();
    setDeploying(false);
  };

  console.log("wrappedContractAddress", wrappedContractAddress);

  const deployContract = async () => {
    try {
      setDeploymentStep(1);
      const bytecode = getCreditCardWrapperBytecode();
      const factory = new ContractFactory(abi, bytecode, signer as Signer);
      setDeploymentStep(2);
      const contract = await factory.deploy(wrappedContractAddress);
      setDeploymentStep(3);

      await contract.deployTransaction.wait();
      setDeploymentStep(4);
      const { data } = await axios.get("/api/register", {
        params: { address: contract.address, chainId, name },
      } as AxiosRequestConfig);
      console.log("CROSSMINT RESULTS", data);
      //   TODO: SUCCESS SCREEN REDIRECT
      const { collectionId } = data;
      console.log("address", address);
      console.log("collectionId", collectionId);
      router.push(`/${collectionId}?price=0.0001&address=${address}`);
    } catch (e) {
      handleTxError(e);
    }
    setDeploymentStep(0);
  };

  return (
    <Button onClick={handleClick} disabled={deploying}>
      {children}
    </Button>
  );
};

export default DeployWrapperButton;
