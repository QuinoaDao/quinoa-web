import { useEffect, useState } from "react";
import { PriceInfo, PriceInfoType } from "../utils/CoinMarketCapInfo";
import { UnderlyingTokenInfo } from "../models/ProductInfo";

export const useUnderlyingTokenPrice = (underlyingTokens: any) => {
  const [tokenPrices, setTokenPrices] = useState<PriceInfoType[]>([]);
  const getPrices = async () => {
    if (underlyingTokens.length === 4) {
      let newTokenPriceList: PriceInfoType[] = [];
      for (let i = 0; i < underlyingTokens.length; i++) {
        let info = await PriceInfo(underlyingTokens[i].symbol);
        newTokenPriceList.push({
          price: info.price,
          percent_change: info.percent_change,
        });
      }
      setTokenPrices(newTokenPriceList);
      //setLoadSkeleton(false);
    }
  };

  useEffect(() => {
    getPrices();
  }, [underlyingTokens]);
  return tokenPrices;
};
