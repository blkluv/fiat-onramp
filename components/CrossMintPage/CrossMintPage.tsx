import type { NextPage } from "next";
import SeoHead from "../SeoHead";
import Footer from "../Footer";
import { CrossmintPayButton } from "@crossmint/client-sdk-react-ui";
import { useRouter } from "next/router";

const CrossMintPage: NextPage = () => {
  const router = useRouter();
  const { clientId, price, recipient } = router.query;

  console.log("router.query", router.query);

  return (
    <div>
      <SeoHead />
      <div className="flex flex-col w-screen justify-center h-[90vh] border border-black-500 p-10 gap-10">
        <CrossmintPayButton
          clientId={clientId as string}
          environment="staging"
          mintTo={recipient as string}
          mintConfig={{
            type: "erc-721",
            totalPrice: price,
            _quantity: 1,
            _to: recipient as string,
          }}
        />
      </div>

      <Footer />
    </div>
  );
};

export default CrossMintPage;
