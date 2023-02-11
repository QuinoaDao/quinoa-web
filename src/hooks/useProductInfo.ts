import { useState, useEffect } from "react";
import product_abi from "../abis/IProduct.json";
import erc20_abi from "../abis/ERC20.json";
import { BigNumberish, ethers } from "ethers";
import { ProductInfo, UnderlyingTokenInfo } from "../models/ProductInfo";
import { PriceInfo } from "../utils/CoinMarketCapInfo";
import { ConvertPrice } from "../utils/PriceConvert";
import { GetLogoImage } from "../utils/LogoImage";

export const useProductInfo = (provider: any) => {
  //const provider = new ethers.providers.Web3Provider(ethereum);
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
    // get underlying token price per 1 token
    for (let i = 0; i < underlyingTokens.length; i++) {
      let address = underlyingTokens[i][0];
      let symbol: string;
      let name: string;
      let balance: BigNumberish;
      let dollarPrice: number;
      let decimal: string;
      let logo: string;
      // get token name and symbol
      // TODO : underlying Token 이 MATIC 일 경우 처리
      let tokenContract = new ethers.Contract(address, erc20_abi.abi, provider);

      name = await tokenContract.name();
      decimal = await tokenContract.decimals();
      balance = await product.assetBalance(address);

      let underlyingInfo: UnderlyingTokenInfo = {
        symbol: "",
        name: name,
        quantity: balance.toString(),
        address: address,
        targetWeight: underlyingTokens[i][1],
        dollarPrice: 0,
        decimal: decimal.toString(),
        logo: "",
      };

      tokenContract.symbol().then((symbol: string) => {
        symbol = symbol;
        underlyingInfo.symbol = symbol;
        ConvertPrice(symbol, 1).then((price: number) => {
          dollarPrice = price;
          underlyingInfo.dollarPrice = dollarPrice;
        });
        GetLogoImage(symbol).then((logo: string) => {
          logo = logo;
          underlyingInfo.logo = logo;
        });
      });
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
