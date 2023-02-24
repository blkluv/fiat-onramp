import "../styles/globals.css";
import "@rainbow-me/rainbowkit/styles.css";
import type { AppProps } from "next/app";
import { RainbowKitProvider, getDefaultWallets } from "@rainbow-me/rainbowkit";
import { chain, configureChains, createClient, WagmiConfig } from "wagmi";
import { alchemyProvider } from "wagmi/providers/alchemy";
import { publicProvider } from "wagmi/providers/public";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const { chains, provider, webSocketProvider } = configureChains(
  [
    chain.mainnet,
    chain.polygon,
    ...(process.env.NEXT_PUBLIC_ENABLE_TESTNETS === "true"
      ? [chain.goerli, chain.polygonMumbai]
      : []),
  ],
  [
    alchemyProvider({
      apiKey: "0jEGdrOL9bPX8YEcylQIuYm6cgObvmHo",
      priority: 0,
    }),
    publicProvider({ priority: 1 }),
  ]
);

const { connectors } = getDefaultWallets({
  appName: "Start Decent",
  chains,
});

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
  webSocketProvider,
});

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <Component {...pageProps} />
        <ToastContainer />
      </RainbowKitProvider>
    </WagmiConfig>
  );
}

export default MyApp;
