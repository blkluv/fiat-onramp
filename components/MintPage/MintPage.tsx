import type { NextPage } from "next";
import SeoHead from "../SeoHead";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import LoginForm from "../LoginForm/LoginForm";
import MintingForm from "../MintingForm";
import getMagicUser from "../../lib/checkMagicLogin";

const MintPage: NextPage = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const checkLogin = async () => {
    const user = await getMagicUser();
    if (user) {
      setIsLoggedIn(true);
    }
  };

  useEffect(() => {
    checkLogin();
  }, []);

  return (
    <div>
      <SeoHead />
      {isLoggedIn ? <MintingForm /> : <LoginForm onLogin={checkLogin} />}
      <Footer />
    </div>
  );
};

export default MintPage;
