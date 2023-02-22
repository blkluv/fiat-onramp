import { ConnectButton } from "@rainbow-me/rainbowkit";
import axios from "axios";
import { useEffect, useState } from "react";
import shortenAddress from "../../lib/shortenAddress";
import Button from "../Button";
import DeployWrapperButton from "../DeployWrapperButton";
import Spinner from "../Spinner";

const DeployWrapperForm = ({ publicKey, setDeploymentStep }: any) => {
  const [contractAddress, setContractAddress] = useState("");
  const [loading, setLoading] = useState();

  useEffect(() => {
    const init = async () => {
      const { data } = await axios.get("/api/getContractInfo");
      console.log("data", data);
    };
    init();
  }, []);

  const onClick = () => {};

  const handleChange = (e: any) => {
    setContractAddress(e.target.value);
  };

  return (
    <main
      style={{ backgroundImage: "url('/images/bg.png')" }}
      className="w-screen min-h-screen bg-cover"
    >
      <ConnectButton />
      <form
        className="flex flex-col justify-center items-center gap-10 w-[90vw] h-[85vh] "
        onSubmit={onClick}
      >
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
