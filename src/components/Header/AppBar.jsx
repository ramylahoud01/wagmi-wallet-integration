import React from "react";
import "./AppBar.css"; // Import CSS styles
import CustomWalletButton from "../CustomWalletButton/CustomWalletButton";
import WagmiWallets from "../wagmiWallets";

const AppBar = () => {
  return (
    // Main AppBar container
    <header className="app-bar">
      {/* Left side - Brand/Logo */}
      <h1 className="app-bar-logo">Nacho</h1>

      {/* Right side - Wallet Connect Button */}
      <div className="app-bar-actions">
        {/*Custom design */}
        <div>
          <p>Custom Wallet</p>
          <CustomWalletButton />
        </div>
        {/*Wagmi default design */}
        <div>
          <p>Wagmi Wallet</p>
          <WagmiWallets />
        </div>
      </div>
    </header>
  );
};

export default AppBar;
