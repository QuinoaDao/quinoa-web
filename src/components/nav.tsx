import React, { useState, useEffect } from "react";
import "./nav.css";
import { ReactComponent as Quinoalogo } from "../components/asset/quinoa_logo_02.svg";

const Nav = ({
  currentAccount,
  correctNetwork,
  connectWallet,
  changeNetwork,
}: any) => {
  const formatAddress = (address: string) => {
    if (address.slice(-4) === ".eth") return address;
    return address.slice(0, 4) + "..." + address.slice(-4);
  };

  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });
  return (
    <header id={scrollPosition < 100 ? "og_header_wrap" : "og_header_wrap"}>
      <div className="header">
        <Quinoalogo className="logo"></Quinoalogo>
        {currentAccount === undefined ? (
          <div onClick={connectWallet} className="wallet_btn">
            <span className="get_start">Get start</span>
          </div>
        ) : !correctNetwork ? (
          <div onClick={changeNetwork} className="wallet_btn">
            <span className="get_start">Change network</span>
          </div>
        ) : (
          <div className="wallet_btn">
            <span className="get_start">{formatAddress(currentAccount)}</span>
          </div>
        )}
      </div>{" "}
    </header>
  );
};
export default Nav;
