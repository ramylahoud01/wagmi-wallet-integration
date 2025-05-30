import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { WagmiProvider, http, createConfig } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { kairos } from "wagmi/chains";
import "@rainbow-me/rainbowkit/styles.css";
import { connectorsForWallets } from "@rainbow-me/rainbowkit";
import {
  metaMaskWallet,
  okxWallet,
  oneKeyWallet,
  rabbyWallet,
  walletConnectWallet,
  safepalWallet,
  tokenPocketWallet,
} from "@rainbow-me/rainbowkit/wallets";

const root = ReactDOM.createRoot(document.getElementById("root"));

const projectId = "YOUR_PROJECT_ID"; // Replace with your actual WalletConnect project ID

// Wallet connectors configuration
const connectors = connectorsForWallets(
  [
    {
      groupName: "Recommended",
      wallets: [
        (options) => walletConnectWallet({ ...options, projectId }),
        metaMaskWallet,
        rabbyWallet,
        okxWallet,
        oneKeyWallet,
        safepalWallet,
        tokenPocketWallet,
      ],
    },
  ],
  {
    appName: "Nacho App",
    projectId,
  }
);

// Wagmi configuration
const config = createConfig({
  autoConnect: false,
  connectors,
  chains: [kairos],
  transports: {
    [kairos.id]: http(),
  },
  ssr: false,
  multiInjectedProviderDiscovery: false,
  walletConnectProjectId: projectId,
});

// Create QueryClient instance
const queryClient = new QueryClient();

root.render(
  <WagmiProvider config={config}>
    <QueryClientProvider client={queryClient}>
      <RainbowKitProvider modalSize="compact">
        <App />
      </RainbowKitProvider>
    </QueryClientProvider>
  </WagmiProvider>
);
