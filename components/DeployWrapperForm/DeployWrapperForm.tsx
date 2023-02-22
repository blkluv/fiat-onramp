import axios, { AxiosRequestConfig } from "axios";
import { useCallback, useState } from "react";
import shortenAddress from "../../lib/shortenAddress";
import DeployWrapperButton from "../DeployWrapperButton";
import ResultsForm from "../ResultsForm";
import VerifyForm from "../VerifyForm";

const DeployWrapperForm = ({ publicKey, setDeploymentStep }: any) => {
  const [contractAddress, setContractAddress] = useState("");
  const [matchingContracts, setMatchingContracts] = useState([]);

  return (
    <main
      style={{ backgroundImage: "url('/images/bg.png')" }}
      className="w-screen min-h-screen bg-cover"
    >
      <div className="flex flex-col justify-center items-center gap-10 w-[90vw] h-[85vh] ">
        {matchingContracts.length > 0 ? (
          <ResultsForm
            contracts={matchingContracts}
            address={contractAddress}
            reset={() => setMatchingContracts([])}
          />
        ) : (
          <VerifyForm onSuccess={setMatchingContracts} />
        )}
      </div>
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
