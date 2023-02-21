import type { NextPage } from "next";
import SeoHead from "../SeoHead";
import Footer from "../Footer";
import MintingForm from "../MintingForm";

const DeployPage: NextPage = () => {
  return (
    <div>
      <SeoHead />
      <MintingForm />
      <Footer />
    </div>
  );
};

export default DeployPage;
