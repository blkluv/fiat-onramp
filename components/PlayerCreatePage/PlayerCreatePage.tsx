import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import SeoHead from "../SeoHead";
import Footer from "../Footer";
import Button from "../Button";
import { Magic } from "magic-sdk";
// import magic from "../../lib/magic";

const PlayerCreatePage: NextPage = () => {
  const onClick = async () => {
    const magic = new Magic(process.env.NEXT_PUBLIC_MAGIC_API_KEY as string, {
      network: "goerli",
    });

    console.log("MAGIC", magic);
    const email = await magic.auth.loginWithMagicLink({
      email: "sweetmantech@gmail.com",
    });

    console.log("email", email);
    const user = await magic.user.getMetadata();
    console.log("user", user);
    const { publicAddress } = user;
    console.log("publicAddress", publicAddress);
  };

  return (
    <div className={`${styles.container}`}>
      <SeoHead />
      <Button onClick={onClick}>hello </Button>
      <Footer />
    </div>
  );
};

export default PlayerCreatePage;
