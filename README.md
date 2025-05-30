# Wagmi Wallet Integration

A React application demonstrating wallet connection using Wagmi, RainbowKit, and Ethers.js. This project shows how to integrate multiple cryptocurrency wallets with both custom and pre-built UI components.

## 🚀 Features

- Multiple wallet support (MetaMask, OKX, OneKey, Rabby, WalletConnect, SafePal, TokenPocket)
- Custom wallet connection button with your own styles
- Pre-built Wagmi wallet button with default styling
- Wallet connection status display
- Ethers.js integration for blockchain interactions
- Kairos testnet configuration

## 📦 Installation

1. **Clone the repository:**
```bash
git clone https://github.com/ramylahoud01/wagmi-wallet-integration.git
cd wagmi-wallet-integration
```

2. **Install dependencies:**
```bash
npm install @rainbow-me/rainbowkit wagmi viem --force
npm install ethers
```

3. **Install other project dependencies:**
```bash
npm install
```

## ⚙️ Configuration

### 1. Get Your WalletConnect Project ID

1. Copy your Project ID
2. Replace the `projectId` in `main.jsx`:

```javascript
const projectId = "YOUR_PROJECT_ID_HERE"; // Replace with your actual project ID
```

### 2. Main Configuration (main.jsx)

The `main.jsx` file is your starting point for Wagmi integration. Here's what it contains:

#### Adding a New Wallet
To add a new wallet, update the `connectors` array:

```javascript
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
        // Add your new wallet here
        newWallet, // Import it first from '@rainbow-me/rainbowkit/wallets'
      ],
    },
  ],
  {
    appName: "Zealous App",
    projectId,
  }
);
```

#### Removing a Wallet
Simply remove the wallet from the `wallets` array in the `connectors` configuration.

#### Changing Networks
To use a different blockchain network, replace `kairos` with your desired chain:

```javascript
import { mainnet, polygon, arbitrum } from "wagmi/chains";

const config = createConfig({
  chains: [mainnet], // Change to your preferred network
  transports: {
    [mainnet.id]: http(), // Update transport accordingly
  },
  // ... other config
});
```

## 🎨 Components

### App.jsx - Main Application

The `App.jsx` file demonstrates two different wallet connection approaches:

#### 1. Custom Wallet Button
- **Location**: Custom styled button with your own CSS
- **Benefits**: Full control over design and user experience
- **Usage**: Implement your own connect/disconnect logic

#### 2. Wagmi Default Button
- **Location**: Pre-built component from RainbowKit
- **Benefits**: Ready-to-use with built-in functionality
- **Usage**: Just import and use

### Wallet Connection Data

The `useAccount` hook provides essential wallet information:

```javascript
const {
  address,        // Wallet address (string | undefined)
  connector,      // Current connector (MetaMask, WalletConnect, etc.)
  isConnected,    // Boolean: true if wallet is connected
  isConnecting,   // Boolean: true during connection process
  isDisconnected, // Boolean: true if no wallet connected
  status,         // String: 'connected', 'disconnected', 'connecting'
  isReconnecting, // Boolean: true during reconnection
} = useAccount();
```

### Blockchain Providers

#### Read-Only Provider
For reading blockchain data (balances, blocks, etc.):
```javascript
const provider = publicClient
  ? new ethers.BrowserProvider(publicClient.transport)
  : null;

// Usage example:
// const balance = await provider.getBalance(address);
```

#### Signer Provider
For sending transactions and signing messages:
```javascript
const signerProvider = walletClient
  ? new ethers.BrowserProvider(walletClient.transport)
  : null;

// Usage example:
// const signer = await signerProvider.getSigner();
// const tx = await signer.sendTransaction({...});
```

## 🔧 Usage Examples

### Checking Wallet Connection
```javascript
if (isConnected) {
  console.log(`Connected to: ${address}`);
  console.log(`Using connector: ${connector?.name}`);
}
```

### Reading Blockchain Data
```javascript
const getBalance = async () => {
  if (provider && address) {
    const balance = await provider.getBalance(address);
    console.log(`Balance: ${ethers.formatEther(balance)} ETH`);
  }
};
```

### Sending a Transaction
```javascript
const sendTransaction = async () => {
  if (signerProvider) {
    const signer = await signerProvider.getSigner();
    const tx = await signer.sendTransaction({
      to: "0x...",
      value: ethers.parseEther("0.01")
    });
    await tx.wait();
  }
};
```

## 🎯 Project Structure

```
src/
├── App.jsx                    # Main app with wallet status display
├── main.jsx                   # Wagmi configuration and providers setup
├── components/
│   ├── Header/
│   │   └── AppBar.jsx        # Navigation bar with wallet buttons
│   ├── CustomWalletButton/   # Your custom wallet connect component
│   └── wagmiWallets.jsx      # Default Wagmi wallet component
└── styles/                   # CSS files
```

## 🚀 Getting Started

1. Follow the installation steps above
2. Replace the `projectId` with your WalletConnect Project ID
3. Run the development server:
```bash
npm start
```
4. Open [http://localhost:3000](http://localhost:3000) in your browser
5. Try connecting different wallets using both button styles

## 🛠️ Customization

- **Custom Styling**: Modify the CSS files in the components folder
- **Add New Chains**: Update the `chains` array in `main.jsx`
- **Wallet Selection**: Add/remove wallets in the `connectors` configuration
- **App Branding**: Update the app name in the RainbowKit configuration

## 📝 Notes

- Make sure to use `--force` flag when installing RainbowKit dependencies
- The project is configured for Kairos testnet by default
- Both custom and Wagmi-styled buttons are functional examples
- Provider and signer examples are included for blockchain interactions

## 🤝 Contributing

Feel free to submit issues and enhancement requests!

## 📄 License

This project is open source and available under the [MIT License](LICENSE).
