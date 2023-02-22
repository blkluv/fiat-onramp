import { useState } from "react";
import ResultsForm from "../ResultsForm";
import VerifyForm from "../VerifyForm";

const DeployWrapperForm = ({
  matchingContracts,
  setMatchingContracts,
  contractAddress,
  setContractAddress,
}: any) => {
  const onSuccess = (matches: any, address: string) => {
    setMatchingContracts(matches);
    setContractAddress(address);
  };

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
          <VerifyForm onSuccess={onSuccess} />
        )}
      </div>
    </main>
  );
};

export default DeployWrapperForm;
