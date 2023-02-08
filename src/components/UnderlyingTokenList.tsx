import React, { useState, useEffect } from "react";
import ListStrategy from "./listStrategy";
import { PriceInfo, PriceInfoType } from "../utils/CoinMarketCapInfo";
import { useUnderlyingTokenPrice } from "../hooks/useUnderlyingTokenPrice";
import { ProductInfo } from "../models/ProductInfo";

export const UnderlyingTokenList = ({ tokens }: any) => {
  console.log("1111", tokens);
  const underlyingPrices = useUnderlyingTokenPrice(tokens);
  console.log("2222", underlyingPrices);
  return (
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
          <span className="column_txt">Balance</span>
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

      {/* undefined 면 스켈레톤 로드 */}
      {tokens === undefined
        ? null
        : tokens.map((item: any, idx: any) => (
            <ListStrategy
              tokenName={item.name}
              quantity={item.quantity}
              tokenUnit={item.symbol}
              balancePercent={parseInt(item.targetWeight) / 1000} // 만분율 -> 백분율
              // token price 는 코마캡, 퍼센트 체인지도 코마캡
              tokenPrice={underlyingPrices[idx].price}
              percentChange={underlyingPrices[idx].percent_change}
            />
          ))}
    </div>
  );
};
