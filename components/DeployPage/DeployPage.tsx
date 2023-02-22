import type { NextPage } from "next";
import SeoHead from "../SeoHead";
import Footer from "../Footer";
import DeployWrapperForm from "../DeployWrapperForm";
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
        <DeployWrapperForm setDeploymentStep={setDeploymentStep} />
      )}
      <Footer />
    </div>
  );
};

export default DeployPage;
