import React, { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import Vaultdetail from "./pages/vaultdetail";
import Nav from "./components/nav";
import Footer from "./components/footer";
import "./App.css";

import { ethers } from "ethers";

function App() {
  const [mmInstalled, setMMInstalled] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<String | undefined>();
  const [currentNetwork, setCurrentNetwork] = useState("");
  const [correctNetwork, setCorrectNetwork] = useState(true);
  const { ethereum } = window;
  const mumbai = "0x13881";

  const listenMMAccount = async () => {
    if (mmInstalled) {
      ethereum.on("accountsChanged", async function () {
        const accounts = await ethereum.request({ method: "eth_accounts" });
        const account = [...accounts].pop();
        setCurrentAccount(account);
        console.log("found new account : ", account);
      });
    }
  };

  const listenMMNetwork = async () => {
    if (mmInstalled) {
      ethereum.on("networkChanged", function () {
        checkCorrectNetwork();
      });
    }
  };

  const checkIfWalletIsConnected = async () => {
    if (ethereum) {
      setMMInstalled(true);
    } else {
      console.log("No Wallet found. Connect Wallet");
      return;
    }
    const accounts = await ethereum.request({ method: "eth_accounts" });
    if (accounts.length !== 0) {
      console.log("Found authorized Account: ", accounts[0]);
      setCurrentAccount(accounts[0]);
      checkCorrectNetwork();
    } else {
      console.log("No authorized account found");
    }
  };

  const connectWallet = async () => {
    try {
      if (!mmInstalled) {
        alert("Please install metamask first");
        return;
      }
      let chainId = await ethereum.request({ method: "eth_chainId" });

      const address = await ethereum.enable();
      await console.log("address : ", address);

      if (chainId !== mumbai) {
        console.log("network is not in baobab. Change Network");
        changeNetwork();
      }
      console.log("Connected to Account: ", address[0]);
      setCurrentAccount(address);
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  const changeNetwork = async () => {
    if (window.ethereum.networkVersion !== mumbai) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: mumbai }],
        });
      } catch (err: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: "Mumbai",
                chainId: mumbai,
                rpcUrls: ["https://polygon-testnet-rpc.allthatnode.com:8545"],
              },
            ],
          });
        }
      }
    }
  };

  const checkCorrectNetwork = async () => {
    let chainId = await ethereum.request({ method: "eth_chainId" });
    console.log("Conneted to chian" + chainId);

    if (chainId !== mumbai) {
      setCorrectNetwork(false);
    } else {
      setCorrectNetwork(true);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    listenMMAccount();
    listenMMNetwork();
  }, [currentAccount]);

  return (
    <div className="App">
      <Nav
        currentAccount={currentAccount}
        correctNetwork={correctNetwork}
        connectWallet={connectWallet}
        changeNetwork={changeNetwork}
      />
      <Vaultdetail></Vaultdetail>
      <Footer></Footer>
    </div>
  );
}

export default App;
