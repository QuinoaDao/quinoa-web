import React, { useState, useEffect } from "react";
import "./vaultdetail.css";
import VaultDetailInfo from "../components/vaultDetailInfo";
import { useProductInfo } from "../hooks/useProductInfo";
import { UnderlyingTokenList } from "../components/underlyingTokenList";
import { BuySellBox } from "../components/buySellBox";
import { BuySellBoxSkeleton } from "../components/buySellBoxSkeleton";
// import PositionInfo from "../components/positionInfo";
import About from "../components/about";
import Stat from "../components/stat";
import Performance from "../components/performance";
import VaultPriceInfo from "../components/vaultPriceInfo";

const Vaultdetail = ({
  connectWallet,
  changeNetwork,
  currentAccount,
  provider,
  mm, // metamask
}: any) => {
  const productInfo = useProductInfo(provider);

  return (
    <body id="body_wrap">
      <div className="infomain_wrap">
        <VaultDetailInfo
          vaultName="Quinoa Static Asset Allocation"
          dacName="QuinoaDAC"
          propensity="Moderate"
        />
        {/* <PositionInfo currentAccount={currentAccount} mm={mm} /> */}
        <VaultPriceInfo productInfo={productInfo} />
        <UnderlyingTokenList tokens={productInfo?.underlyingTokens} />
        <Performance />
        <About />
        <Stat productInfoTvl={productInfo?.tvl} />
      </div>
      {productInfo === undefined ? (
        <BuySellBoxSkeleton />
      ) : (
        <BuySellBox
          connectWallet={connectWallet}
          changeNetwork={changeNetwork}
          currentAccount={currentAccount}
          provider={provider}
          mm={mm}
          productInfo={productInfo}
        />
      )}
    </body>
  );
};
export default Vaultdetail;
