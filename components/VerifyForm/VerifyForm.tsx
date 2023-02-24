import axios, { AxiosRequestConfig } from "axios";
import { useState } from "react";
import Button from "../Button";
import Spinner from "../Spinner";

const VerifyForm = ({ onSuccess }: any) => {
  const [loading, setLoading] = useState(false);
  const [address, setAddress] = useState("");

  const onClick = async () => {
    setLoading(true);
    await verify(address);
    setLoading(false);
    return;
  };

  const verify = async (address: string) => {
    const { data } = await axios.get("/api/getAllContracts", {
      params: { contractAddress: address },
    } as AxiosRequestConfig);
    const { matches } = data;
    onSuccess(matches || [null], address);
    return;
  };

  return (
    <div className="flex flex-col justify-center items-center gap-10">
      <div>
        <p className="font-header">Your Contract Address</p>
        <input
          className="border border-black text-black rounded-lg p-4 w-[400px]"
          onChange={(e) => setAddress(e.target.value)}
        />
      </div>
      <Button onClick={onClick} type="submit" disabled={loading}>
        {loading ? <Spinner width={20} height={20} color="black" /> : "Verify"}
      </Button>
    </div>
  );
};

export default VerifyForm;
