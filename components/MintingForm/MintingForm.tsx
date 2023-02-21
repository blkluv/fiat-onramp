import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
import { useEffect } from "react";
import shortenAddress from "../../lib/shortenAddress";
import DeployWrapperButton from "../DeployWrapperButton";

const MintingForm = ({ publicKey, setDeploymentStep }: any) => {
  useEffect(() => {
    const init = async () => {
      const { data } = await axios.get("/api/getContractInfo");
      console.log("data", data);
    };
    init();
  }, []);

  return (
    <main
      style={{ backgroundImage: "url('/images/bg.png')" }}
      className="w-screen min-h-screen bg-cover"
    >
      <ConnectButton />
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

export default MintingForm;
