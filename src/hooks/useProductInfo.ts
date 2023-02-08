import { useState, useEffect } from "react";
import product_abi from "../abis/IProduct.json";
import erc20_abi from "../abis/ERC20.json";
import { BigNumberish, ethers } from "ethers";
import { ProductInfo, UnderlyingTokenInfo } from "../models/ProductInfo";
import { PriceInfo } from "../utils/CoinMarketCapInfo";

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
      let address = underlyingTokens[i][0];
      let symbol: string;
      let name: string;
      let balance: BigNumberish;
      // get token name and symbol
      // TODO : underlying Token 이 MATIC 일 경우 처리
      let tokenContract = new ethers.Contract(address, erc20_abi.abi, provider);
      symbol = await tokenContract.symbol();
      name = await tokenContract.name();
      balance = await product.assetBalance(address);
      let underlyingInfo: UnderlyingTokenInfo = {
        symbol: symbol,
        name: name,
        quantity: balance,
        address: address,
        targetWeight: underlyingTokens[i][1],
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
