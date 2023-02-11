import { useEffect, useState } from "react";
import { PriceInfo, PriceInfoType } from "../utils/CoinMarketCapInfo";
import { UnderlyingTokenInfo } from "../models/ProductInfo";

export const useUnderlyingTokenPrice = (underlyingTokens: any) => {
  const [tokenPrices, setTokenPrices] = useState<PriceInfoType[]>([]);
  console.log("4444", underlyingTokens);
  const getPrices = async () => {
    if (underlyingTokens !== undefined) {
      console.log("underlyingTokensChange", underlyingTokens.length);
      for (let i = 0; i < underlyingTokens.length; i++) {
        let info = await PriceInfo(underlyingTokens[i].symbol);
        console.log("5555", info);
        setTokenPrices((prev) => [
          ...prev,
          {
            price: info.price,
            percent_change: info.percent_change,
          },
        ]);
      }
    }
  };

  useEffect(() => {
    console.log("?");
    getPrices();
  }, [underlyingTokens]);
  return tokenPrices;
};
