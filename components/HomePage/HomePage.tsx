import type { NextPage } from "next";
import styles from "../../styles/Home.module.css";
import { useState } from "react";
import LaunchPage from "../LaunchPage";
import DeployPage from "../DeployPage";

const Home: NextPage = () => {
  const [entered, setEntered] = useState(false);

  return (
    <div className={`${styles.container} background`}>
      {entered ? (
        <DeployPage />
      ) : (
        <LaunchPage onClick={() => setEntered(true)} />
      )}
    </div>
  );
};

export default Home;
