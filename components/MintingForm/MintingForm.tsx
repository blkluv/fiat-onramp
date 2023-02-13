import axios from "axios";
import { useEffect, useState } from "react";
import getMagicUser from "../../lib/checkMagicLogin";
import shortenAddress from "../../lib/shortenAddress";

const MintingForm = () => {
  const [publicKey, setPublicKey] = useState("");

  useEffect(() => {
    const init = async () => {
      const user = await getMagicUser();

      setPublicKey(shortenAddress(user.publicAddress as string));

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
      <div className="min-h-screen grid md:grid-cols-2 grid-cols-1">
        <div className="flex flex-wrap items-center">
          <div className="space-y-8">
            <h1>Project Title or Skeleton</h1>
            <p className="w-2/3">Project Description</p>
          </div>
        </div>
        <div className="flex flex-wrap items-center">
          <div className="space-y-8">
            Public Key: {publicKey}
            <p>Price: </p>
          </div>
        </div>
      </div>
    </main>
  );
};

export default MintingForm;
