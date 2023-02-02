import React, { useState } from "react";

import { TokenInterface, Tokens } from "../pages/vaultdetail";

const SelectToken = ({ setSelectedToken, setShowOption }: any) => {
  const [token, setToken] = useState<TokenInterface>(Tokens[0]);
  return (
    <ul className="selectbox_list">
      {Tokens.map((t: TokenInterface) => {
        let imgUrl = "/asset/" + t.symbol + ".svg";
        return (
          <div
            onClick={() => {
              setToken(t);
              setSelectedToken(t);
              setShowOption(false);
            }}
          >
            <li className={t == token ? "active noHover" : "nonactive"}>
              <div className="token">
                <img src={imgUrl} />
                <span className="token_name">{t.symbol}</span>
              </div>
              <span className="token_subname">{t.subName}</span>
            </li>
          </div>
        );
      })}
    </ul>
  );
};

export default SelectToken;
