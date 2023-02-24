import type { NextPage } from "next";
import SeoHead from "../SeoHead";
import Footer from "../Footer";
import DeployWrapperForm from "../DeployWrapperForm";
import { useState } from "react";

const DeployPage: NextPage = () => {
  const [matchingContracts, setMatchingContracts] = useState([]);
  const [contractAddress, setContractAddress] = useState("");

  return (
    <div>
      <SeoHead />
      <DeployWrapperForm
        matchingContracts={matchingContracts}
        setMatchingContracts={setMatchingContracts}
        contractAddress={contractAddress}
        setContractAddress={setContractAddress}
      />
      <Footer />
    </div>
  );
};

export default DeployPage;
