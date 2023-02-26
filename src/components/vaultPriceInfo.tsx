import { useState } from "react";

const VaultPriceInfo = ({productInfo}: any) => {

    const [priceChangStat, setPriceChangeStat] = useState("up");
    const [priceChangePercent, setPriceChangePercent] = useState(0);
  
    return (
        <>
        <div className="spacing_33px_underline"></div>
        <div className="spacing_51px"></div>
        <div className="vault_priceinfo">
          <div className="aum">
            <span className="About_txt_short">AUM(TVL)</span>
            {productInfo === undefined ? (
              <div className="s_number_txt"></div>
            ) : (
              <span className="number_txt">${Math.round(productInfo?.tvl * 100) / 100}</span>
            )}
          </div>
          <div className="currentprice">
            <span className="About_txt_short">Current Price</span>
            {productInfo === undefined ? (
              <div className="s_number_txt"></div>
            ) : (
              <span className="number_txt">${Math.round(productInfo?.currentPrice * 1000 ) / 1000}</span>
            )}
          </div>
          <div className="percentchange">
            <span className="About_txt_short">Percent Change</span>
            <span className="percent_txt">

              {productInfo === undefined ? (
                <div className="s_number_txt"></div>
              ) : (
                <>
                <span className="pc_icon">
                  {priceChangStat === "up" ? (
                    <img src="/asset/pc_icon_up.svg" />
                  ) : (
                    <img src="/asset/pc_icon_down.svg" />
                  )}
                </span>
                <span>{priceChangePercent}%</span>
                </>
              )}
            </span>
          </div>
        </div>
        </>
    );
}

export default VaultPriceInfo;