import { useEffect, useState } from "react";
import { roundNumbers } from "../utils/MathUtils";

const VaultPriceInfo = ({productInfo}: any) => {

    const [priceChangStat, setPriceChangeStat] = useState("up");
    const [priceChangePercent, setPriceChangePercent] = useState(0);

    useEffect(() =>{
      if(productInfo !== undefined) {
        let changePercent = (productInfo.currentPrice - 1) * 100;
        if(productInfo.currentPrice < 1) { // 1보다 작은 경우 (손해가 난 경우) 
          setPriceChangeStat("down");
          changePercent *= -1;
        }
        else {
          setPriceChangeStat("up");
        }
        setPriceChangePercent(changePercent);
      }
    }, [productInfo])
  
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
              <span className="number_txt">${roundNumbers(productInfo?.tvl)}</span>
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
                <span>{roundNumbers(priceChangePercent)}%</span>
                </>
              )}
            </span>
          </div>
        </div>
        </>
    );
}

export default VaultPriceInfo;