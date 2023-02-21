import { useConnectModal } from "@rainbow-me/rainbowkit";
import { ContractFactory, Signer } from "ethers";
import { useState } from "react";
import { useSigner } from "wagmi";
import abi from "../../lib/adapter-abi.json";
import getCreditCardWrapperBytecode from "../../lib/getCreditCardWrapperBytecode";
import handleTxError from "../../lib/handleTxError";
import Button from "../Button";

const DeployWrapperButton = ({ setDeploymentStep }: any) => {
  const { data: signer } = useSigner();
  const { openConnectModal } = useConnectModal();
  const [deploying, setDeploying] = useState(false);

  const deployContract = async () => {
    try {
      setDeploymentStep(1);
      const bytecode = getCreditCardWrapperBytecode();
      const factory = new ContractFactory(abi, bytecode, signer as Signer);
      setDeploymentStep(2);
      const wrappedContractAddress =
        "0xf8D0Ad9F7C4e3E7d7D5629966D05671Ebd33931A";
      const contract = await factory.deploy(wrappedContractAddress);
      setDeploymentStep(3);

      await contract.deployTransaction.wait();
      setDeploymentStep(4);
      //   TODO: SUCCESS SCREEN REDIRECT
      setDeploymentStep(0);
    } catch (e) {
      handleTxError(e);
    }
  };

  const handleClick = async () => {
    if (!signer) {
      openConnectModal?.();
      return;
    }
    setDeploying(true);
    await deployContract();
    setDeploying(false);
  };

  return (
    <Button onClick={handleClick} disabled={deploying}>
      deploy
    </Button>
  );
};

export default DeployWrapperButton;
