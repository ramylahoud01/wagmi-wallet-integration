import { useAccount, usePublicClient, useWalletClient } from "wagmi";
import AppBar from "./components/Header/AppBar";
import { ethers } from "ethers";

function App() {
  const publicClient = usePublicClient();
  const { data: walletClient } = useWalletClient();

  // Create an ethers provider connected to the public client (read-only)
  // This provider can be used to read blockchain data (e.g., getBalance, getBlock)
  const provider = publicClient
    ? new ethers.BrowserProvider(publicClient.transport)
    : null;

  // Create an ethers provider connected to the wallet client (signer)
  // To send transactions or sign messages, use this signer provider
  // You can get the signer from this provider by calling:
  //   const signer = await signerProvider.getSigner();
  const signerProvider = walletClient
    ? new ethers.BrowserProvider(walletClient.transport)
    : null;

  const {
    address, // The wallet address (string | undefined)
    connector, // The connector object used (e.g., MetaMask, WalletConnect)
    isConnected, // Boolean indicating if a wallet is connected
    isConnecting, // Boolean indicating if connection is in progress
    isDisconnected, // Boolean indicating if disconnected
    status, // Connection status string: 'connected', 'disconnected', 'connecting'
    isReconnecting, // Boolean for if a reconnection attempt is ongoing
    onDisconnect, // Function to programmatically disconnect the wallet
  } = useAccount();

  return (
    <>
      <AppBar />
      <main style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
        <h2>Wallet Connection Status</h2>
        <p>
          <strong>Address:</strong> {address ? address : "No wallet connected"}
        </p>
        <p>
          <strong>Status:</strong> {status}
        </p>
        <p>
          {isConnecting && <em>Connecting to wallet...</em>}
          {isReconnecting && <em>Reconnecting to wallet...</em>}
          {isDisconnected && <em>Wallet disconnected</em>}
        </p>
      </main>
    </>
  );
}

export default App;
