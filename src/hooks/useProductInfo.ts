import { useState, useEffect } from "react";
import product_abi from "../abis/IProduct.json";

import { ethers } from "ethers";
import { ProductInfo, UnderlyingTokenInfo } from "../models/ProductInfo";

export const useProductInfo = (ethereum: Window["ethereum"]) => {
  const provider = new ethers.providers.Web3Provider(ethereum);
  const signer = provider.getSigner();
  const [productInfo, setProductInfo] = useState<ProductInfo>();
  const getProductInfo = async () => {
    const productAddress: string = process.env.REACT_APP_PRODUCT_ADDRESS || "";

    const product = new ethers.Contract(
      productAddress,
      product_abi.abi,
      provider
    );

    const [tvl, currentPrice, underlyingTokens] = await Promise.all([
      product.portfolioValue(),
      product.sharePrice(),
      product.currentAssets(),
    ]);
    console.log(tvl, currentPrice, underlyingTokens);
    var newUnderlyingInfo: UnderlyingTokenInfo[] = [];
    for (let i = 0; i < underlyingTokens.length; i++) {
      let underlyingInfo: UnderlyingTokenInfo = {
        address: underlyingTokens[i][0],
        targetWeight: underlyingTokens[i][1],
        currentPrice: underlyingTokens[i][2],
      };
      newUnderlyingInfo.push(underlyingInfo);
    }
    setProductInfo({
      tvl: tvl,
      currentPrice: currentPrice,
      underlyingTokens: newUnderlyingInfo,
    });
  };

  useEffect(() => {
    getProductInfo();
  }, []);
  return productInfo;
};
