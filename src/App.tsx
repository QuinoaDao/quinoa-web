import React, { useState, useEffect } from "react";
import Landing from "./pages/Landing";
import Vaultdetail from "./pages/vaultdetail";
import Nav from "./components/nav";
import Footer from "./components/footer";
import { ethers } from "ethers";
import "./App.css";

// import { ethers } from "ethers";

type Network = {
  name: string;
  id: string;
};

function App() {
  const [mmInstalled, setMMInstalled] = useState(false);
  const [currentAccount, setCurrentAccount] = useState<any>();
  const [correctNetwork, setCorrectNetwork] = useState(true);

  const { ethereum } = window;
  const [quinoa_provider, setQuinoaProvider] = useState(
    new ethers.providers.JsonRpcProvider(process.env.REACT_APP_ALCHEMY_RPC_URL || "https://polygon-rpc.com")
  );

  const targetNetwork: Network = {
    name: process.env.REACT_APP_NETWORK_NAME || "Polygon",
    id: process.env.REACT_APP_NETWORK_ID || "0x89",
  };

  console.log("QUINOA PROVIDER", quinoa_provider);

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

      let address = await ethereum.request({method: 'eth_requestAccounts'});

      if (chainId !== targetNetwork.id) {
        console.log(
          "Network is not in",
          targetNetwork.name,
          ". Change Network"
        );
        changeNetwork();
      }
      console.log("Connected to Account: ", address[0]);
      setCurrentAccount(address);
    } catch (error) {
      console.log("Error connecting to metamask", error);
    }
  };

  const changeNetwork = async () => {
    if (window.ethereum.networkVersion !== targetNetwork.id) {
      try {
        await window.ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [{ chainId: targetNetwork.id }],
        });
      } catch (err: any) {
        // This error code indicates that the chain has not been added to MetaMask
        if (err.code === 4902) {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                chainName: targetNetwork.name,
                chainId: targetNetwork.id,
                rpcUrls: [process.env.REACT_APP_ALCHEMY_RPC_URL || "https://polygon-rpc.com"],
              },
            ],
          });
        }
      }
    }
  };

  const checkCorrectNetwork = async () => {
    let chainId = await ethereum.request({ method: "eth_chainId" });
    if (chainId !== targetNetwork.id) {
      setCorrectNetwork(false);
    } else {
      setCorrectNetwork(true);
    }
  };

  useEffect(() => {
    checkIfWalletIsConnected();
    listenMMAccount();
    listenMMNetwork();
    console.log("currnet account: ", currentAccount);
  }, [currentAccount]);

  return (
    <div className="App">
      <Nav
        currentAccount={currentAccount}
        correctNetwork={correctNetwork}
        connectWallet={connectWallet}
        changeNetwork={changeNetwork}
      />
      <Vaultdetail
        currentAccount={currentAccount}
        correctNetwork={correctNetwork}
        provider={quinoa_provider}
        mm={ethereum}
      />

      <Footer />
    </div>
  );
}

export default App;
