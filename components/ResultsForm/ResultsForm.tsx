import { useRouter } from "next/router";
import { allChains } from "wagmi";
import shortenAddress from "../../lib/shortenAddress";
import Button from "../Button";
import DeployWrapperButton from "../DeployWrapperButton";

const ResultsForm = ({ contracts, address, reset, setDeploymentStep }: any) => {
  const router = useRouter();

  return (
    <div className="flex flex-col gap-5">
      <div className="text-center text-xl">
        Results for {shortenAddress(address)}
      </div>
      {contracts.map((contract: any) => {
        const myChain = allChains.find(
          (chain) => contract.chainId === chain.id
        );
        return (
          <DeployWrapperButton
            setDeploymentStep={setDeploymentStep}
            key={contract?.name}
            wrappedContractAddress={address}
            chainId={myChain?.id}
            name={contract?.name}
          >
            {contract?.name} - {myChain?.name}
          </DeployWrapperButton>
        );
      })}
      <Button onClick={reset}>try again</Button>

      <Button
        onClick={(e: any) => router.push("https://twitter.com/decentxyz")}
      >
        get help
      </Button>
    </div>
  );
};

export default ResultsForm;
