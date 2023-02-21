import type { NextPage } from "next";
import SeoHead from "../SeoHead";
import Footer from "../Footer";
import MintingForm from "../MintingForm";
import { useState } from "react";
import TxScreen from "../TxScreen";
import { useNetwork } from "wagmi";

const DeployPage: NextPage = () => {
  const [deploymentStep, setDeploymentStep] = useState(0);
  const { chain } = useNetwork();

  return (
    <div>
      <SeoHead />
      {deploymentStep > 0 ? (
        <TxScreen
          step={deploymentStep}
          chainName={chain?.name}
          titleText="Deploying Credit Card Wrapper"
        />
      ) : (
        <MintingForm setDeploymentStep={setDeploymentStep} />
      )}
      <Footer />
    </div>
  );
};

export default DeployPage;
