import React, { useState, useEffect } from "react";

import { TokenInterface, Tokens } from "../pages/vaultdetail";

const SelectToken = ({
  selectedToken,
  setSelectedToken,
  setShowOption,
}: any) => {
  console.log(selectedToken);
  return (
    <ul className="selectbox_list">
      {Tokens.map((t: TokenInterface) => {
        let imgUrl = "/asset/" + t.symbol + ".svg";
        return (
          <li
            className={
              t === selectedToken ? "active options noHover" : "options"
            }
            onClick={() => {
              setSelectedToken(t);
              setShowOption(false);
            }}
          >
            <div className="token">
              <img src={imgUrl} />
              <span className="token_name">{t.symbol}</span>
            </div>
            <span className="token_subname">{t.subName}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default SelectToken;
