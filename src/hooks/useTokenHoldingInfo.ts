import { useEffect, useState } from "react";
import ERC20_abi from "../abis/ERC20.json";
import { ethers } from "ethers";
import { TokenInterface } from "../pages/vaultdetail";
import { UnderlyingTokenInfo } from "../models/ProductInfo";

export const useTokenHoldingInfo = (
  currentAccount: string | undefined,
  token: UnderlyingTokenInfo | undefined,
  ethereum: Window["ethereum"]
) => {
  const [tokenHolding, setTokenHolding] = useState<number>(0);
  const provider = new ethers.providers.Web3Provider(ethereum);

  const getHoldings = async (
    currentAddress: string | undefined,
    token: UnderlyingTokenInfo
  ) => {
    if (currentAddress === undefined) {
      return;
    }
    const tokenContract = new ethers.Contract(
      token.address,
      ERC20_abi.abi,
      provider
    );

    let balance: ethers.BigNumberish;
    let amount: number;

    if (token.symbol == "MATIC") {
      balance = await provider.getBalance(currentAddress);
    } else {
      const tonkenContract = new ethers.Contract(
        token.address,
        ERC20_abi.abi,
        provider
      );
      balance = await tonkenContract.balanceOf(currentAddress);
    }
    amount = Number(ethers.utils.formatUnits(balance, token.decimal));
    setTokenHolding(amount);
  };
  useEffect(() => {
    if (token !== undefined) {
      getHoldings(currentAccount, token);
    }
  }, [currentAccount, token]);
  return tokenHolding;
};
