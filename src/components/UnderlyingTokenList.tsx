import React, { useState, useEffect } from "react";
import ListStrategy from "./listStrategy";
import { PriceInfo, PriceInfoType } from "../utils/CoinMarketCapInfo";
import { useUnderlyingTokenPrice } from "../hooks/useUnderlyingTokenPrice";
import { ProductInfo } from "../models/ProductInfo";
import { UnderlyingTokenSkeleton } from "./underlyingTokenSkeleton";

export const UnderlyingTokenList = ({ tokens }: any) => {
  const underlyingPrices = useUnderlyingTokenPrice(tokens);

  return (
    <>
    <div className="spacing_33px"></div>
    <div className="ut_wrap">
      <header>
        <div className="column_first">
          <span className="column_txt">Underlying Tokens</span>
        </div>
        <div className="column_quantity">
          <div className="spacing_line"></div>
          <div className="spacing_14px"></div>
          <span className="column_txt">Quantity</span>
        </div>
        <div className="column_Tokenprice">
          <div className="spacing_line"></div>
          <div className="spacing_14px"></div>
          <span className="column_txt">Token Price</span>
        </div>
        <div className="column_Tokenbalance">
          <div className="spacing_line"></div>
          <div className="spacing_14px"></div>
          <span className="column_txt">Allocation</span>
        </div>
        <div className="column_PercentChange">
          <div className="spacing_line"></div>
          <div className="spacing_14px"></div>
          <span className="column_txt">Percent Change</span>
        </div>
        <div className="column_Totalvalue">
          <div className="spacing_line"></div>
          <div className="spacing_14px"></div>
          <span className="column_txt">Total Value</span>
        </div>
      </header>
      <div className="headerUnderline"></div>

      {tokens === undefined || underlyingPrices.length === 0 ? (
        <UnderlyingTokenSkeleton />
      ) : (
        tokens.map((item: any, idx: any) => (
          <ListStrategy
            symbol={item.symbol}
            tokenName={item.name}
            tokenImage={item.logo}
            quantity={item.quantity}
            tokenUnit={item.symbol}
            balancePercent={parseInt(item.targetWeight) / 1000} // 십만분율 -> 백분율
            tokenPrice={underlyingPrices[idx].price}
            percentChange={underlyingPrices[idx].percent_change}
            totalValue={
              item.quantity * underlyingPrices[idx].price
            }
          />
        ))
      )}
    </div>
    </>
  );
};
