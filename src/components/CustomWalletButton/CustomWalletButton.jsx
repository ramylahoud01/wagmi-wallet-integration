import React from "react";
import { ConnectButton } from "@rainbow-me/rainbowkit";
import "./CustomWalletButton.css"; // Import our CSS styles

const CustomWalletButton = () => {
  // Custom Button Component - reusable button with consistent styling
  const CustomButton = ({ onClick, children, className = "", ...props }) => {
    return (
      <button
        onClick={onClick}
        className={`wallet-button custom-button ${className}`}
        {...props}
      >
        {children}
      </button>
    );
  };

  return (
    // RainbowKit's ConnectButton.Custom provides wallet connection logic
    <ConnectButton.Custom>
      {({
        account, // User's wallet account info
        chain, // Current blockchain network
        openAccountModal, // Function to open account details modal
        openChainModal, // Function to open chain/network selection modal
        openConnectModal, // Function to open wallet connection modal
        authenticationStatus, // Authentication state
        mounted, // Component mount state
      }) => {
        // Check if component is ready and not in loading state
        const ready = mounted && authenticationStatus !== "loading";
        // Check if wallet is connected (has account and chain)
        const connected = ready && account && chain;

        // Don't render anything if component isn't ready yet
        if (!ready) {
          return null;
        }

        // If wallet is not connected, show connect button
        if (!connected) {
          return (
            <button
              onClick={openConnectModal}
              className="wallet-button connect-button"
            >
              Connect Wallet
            </button>
          );
        }

        // If wallet is connected, show chain and account buttons
        return (
          <div className="button-container">
            {/* Chain/Network Button */}
            <CustomButton
              onClick={openChainModal}
              className={`chain-button ${
                chain.unsupported ? "unsupported" : ""
              }`}
            >
              {/* Show chain icon if available */}
              {chain?.hasIcon && (
                <img
                  src={chain.iconUrl}
                  alt={chain.name}
                  className="chain-icon"
                />
              )}
              {/* Show appropriate text based on chain support */}
              {chain.unsupported ? "Wrong Network" : chain.name}
            </CustomButton>

            {/* Account Button - shows wallet address or ENS name */}
            <CustomButton onClick={openAccountModal} className="account-button">
              {account.displayName}
            </CustomButton>
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};

export default CustomWalletButton;
