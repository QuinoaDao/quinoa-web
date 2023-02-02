import React, { useState } from "react";
import { tokenToString } from "typescript";
import { TokenInterface, Tokens } from "../pages/vaultdetail";

const SelectToken = ({ setSelectedToken }: any) => {
  const [showOption, setShowOption] = useState(false);
  const [token, setToken] = useState<TokenInterface>(Tokens[0]);
  return (
    <button className="selectbox_wrap">
      <div className="selectbox" onClick={() => setShowOption(!showOption)}>
        <div className="token">
          <img src={"/asset/" + token.symbol + ".svg"} />
          <span className="token_name">{token.symbol}</span>
        </div>
      </div>
      {showOption ? (
        <ul className="selectbox_list">
          {Tokens.map((t: TokenInterface) => {
            let imgUrl = "/asset/" + t.symbol + ".svg";
            return (
              <div
                onClick={() => {
                  setToken(t);
                  setSelectedToken(t);
                  setShowOption(!showOption);
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
      ) : null}
    </button>
  );
};

export default SelectToken;
