import { useState, useEffect } from "react";
import product_abi from "../abis/IProduct.json";
import { ethers } from "ethers";

export const useInvestedAmountInfo = (
  currentAddress: string | undefined,
  ethereum: Window["ethereum"],
  setShareBalance: any
  ) => {
  const [investedAmount, setInvestedAmount] = useState(0);
  const provider = new ethers.providers.Web3Provider(ethereum);
  const productContract = new ethers.Contract(
    process.env.REACT_APP_PRODUCT_ADDRESS || "",
    product_abi.abi,
    provider
  );

  const getInvestedAmountInfo = async () => {
    if (currentAddress === undefined) {
      return;
    }
    const balance = await productContract.balanceOf(currentAddress);
    if(setShareBalance != undefined) {
      setShareBalance(balance);
    }
    const amount = await productContract.shareValue(balance);
    // setInvestedAmount(Number(ethers.utils.formatEther(amount)));
    setInvestedAmount(amount);
  };

  useEffect(() => {
    getInvestedAmountInfo();
  }, [currentAddress]);
  // string
  return investedAmount;
};
