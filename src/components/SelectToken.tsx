import React, { useState, useEffect } from "react";

import { UnderlyingTokenInfo } from "../models/ProductInfo";

const SelectToken = ({
  underlyingTokens,
  selectedToken,
  setSelectedToken,
  setShowOption,
}: any) => {
  console.log(selectedToken);
  return (
    <ul className="selectbox_list">
      {underlyingTokens
        .filter((token: UnderlyingTokenInfo) => {
          if (token.symbol === "LINK") {
            return false;
          }
          return true;
        })
        .map((t: UnderlyingTokenInfo) => {
          return (
            <li
              className={t === selectedToken ? "active noHover" : "nonactive"}
              onClick={() => {
                setSelectedToken(t);
                setShowOption(false);
              }}
            >
              <div className="token">
                <img src={t.logo} />
                <span className="token_name">{t.symbol}</span>
              </div>
              <span className="token_subname">{t.name}</span>
            </li>
          );
        })}
    </ul>
  );
};

export default SelectToken;
