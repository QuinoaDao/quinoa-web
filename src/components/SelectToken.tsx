import React, { useState, useEffect } from "react";

import { TokenInterface, Tokens } from "../pages/vaultdetail";
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
      {underlyingTokens.map((t: UnderlyingTokenInfo) => {
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
