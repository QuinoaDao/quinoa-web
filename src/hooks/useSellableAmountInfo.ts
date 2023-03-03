import { useState, useEffect } from "react";
import product_abi from "../abis/IProduct.json";
import { ethers } from "ethers";
import { UnderlyingTokenInfo } from "../models/ProductInfo";

export const useSellableAmountInfo = (
  currentAddress: string | undefined,
  shareAmount: any,
  asset: UnderlyingTokenInfo | undefined,
  ethereum: Window["ethereum"]
) => {
  const [sellabeAmount, setSellabeAmount] = useState(0);
  const provider = new ethers.providers.Web3Provider(ethereum);
  const productContract = new ethers.Contract(
    process.env.REACT_APP_PRODUCT_ADDRESS || "",
    product_abi.abi,
    provider
  );
  const getSellableAmount = async () => {
    if (
      currentAddress === undefined ||
      asset === undefined ||
      shareAmount === undefined
    ) {
      return;
    }
    const amount: any = await productContract.convertToAssets(
      asset.address,
      shareAmount
    );
    setSellabeAmount(Number(ethers.utils.formatUnits(amount, asset.decimal)));
  };

  useEffect(() => {
    getSellableAmount();
  }, [asset, currentAddress, shareAmount]);
  // string
  return sellabeAmount;
};
