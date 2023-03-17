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
  const logomap = {
    USDC: "https://s2.coinmarketcap.com/static/img/coins/64x64/3408.png",
    WMATIC: "https://s2.coinmarketcap.com/static/img/coins/64x64/8925.png",
    WETH: "https://s2.coinmarketcap.com/static/img/coins/64x64/2396.png",
    LINK: "https://s2.coinmarketcap.com/static/img/coins/64x64/1975.png",
    QUICK: "https://s2.coinmarketcap.com/static/img/coins/64x64/8206.png"
  };

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

    var newUnderlyingInfo: UnderlyingTokenInfo[] = [];
    // get underlying token price per 1 token
    for (let i = 0; i < underlyingTokens.length; i++) {
      let address = underlyingTokens[i][0];

      // get token name and symbol
      // TODO : underlying Token 이 MATIC 일 경우 처리
      let tokenContract = new ethers.Contract(address, erc20_abi.abi, provider);

      const [name, decimal, balance, symbol] = await Promise.all([
        tokenContract.name(),
        tokenContract.decimals(),
        product.assetBalance(address),
        tokenContract.symbol(),
      ]);

      let underlyingInfo: UnderlyingTokenInfo = {
        symbol: symbol,
        name: name,
        quantity: Number(ethers.utils.formatUnits(balance, decimal)),
        address: address,
        targetWeight: underlyingTokens[i][1],
        dollarPrice: 0,
        decimal: decimal.toString(),
        logo: "",
      };
      const [dollarPrice] = await Promise.all([ConvertPrice(symbol, 1)]);

      underlyingInfo.logo =
        logomap[underlyingInfo.symbol as keyof typeof logomap];
      underlyingInfo.dollarPrice = dollarPrice;

      newUnderlyingInfo.push(underlyingInfo);
    }

    setProductInfo({
      tvl: Number(ethers.utils.formatEther(tvl)),
      currentPrice: Number(ethers.utils.formatEther(currentPrice)),
      underlyingTokens: newUnderlyingInfo,
    });
  };

  useEffect(() => {
    getProductInfo();
  }, []);
  return productInfo;
};
