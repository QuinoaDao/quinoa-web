import { formatEther } from "ethers/lib/utils";
import React, { useEffect, useState } from "react";
import { usePositionInfo } from "../hooks/usePositionInfo";
import { roundNumbers } from "../utils/MathUtils";

const PositionInfo = ({currentAccount, shareBalance, investedValue, provider}: any) => {
  const positionInfo = usePositionInfo(currentAccount, shareBalance, investedValue, provider);
  const [priceChangeStat, setPriceChangeStat] = useState("up");
  console.log("position info?", positionInfo?.totalReturn.toString());

  useEffect(() => {
    setPriceChangeStat(positionInfo?.investStat || "up");
    console.log(priceChangeStat);
  }, [positionInfo])

  return (
    <div className="positionInfo_wrap">
    <div className="positionInfo investmentValue">
      <span className="txt">Your Investment Value</span>
      <span className="number">${roundNumbers(formatEther(investedValue))}</span>
    </div>
    <div className="positionInfo averageUnitprice">
      <span className="txt">Your Average unit price</span>
      {
        positionInfo === undefined ? 
        ( <div className="s_number_txt"></div> )
        :
        ( <span className="number">${roundNumbers(formatEther(positionInfo?.averageUnitPrice))}</span> )
      }

    </div>
    <div className="positionInfo totalReturn">
      <span className="txt">Total Return</span>


        {
          positionInfo === undefined ?
          ( <div className="s_number_txt"></div> )
          :
          (
            priceChangeStat === "up" ? 
            (
              <div className="totalReturn_txt">
                <span className="position_icon">
                  <img src="/asset/tr_icon_up.svg" />
                </span>
                <span className="up">${roundNumbers(formatEther(positionInfo?.totalReturn))}</span> 
                <span className="up">({roundNumbers(formatEther(positionInfo?.totalReturnChange))}%)</span> 
              </div>
            )
            :
            (
              <div className="totalReturn_txt">
                <span className="position_icon">
                  <img src="/asset/tr_icon_down.svg" />
                </span>
                <span className="down">${roundNumbers(formatEther(positionInfo?.totalReturn))}</span> 
                <span className="down">({roundNumbers(formatEther(positionInfo?.totalReturnChange))}%)</span> 
              </div>
            )

          )
        }

    </div>
    </div>
  );
};

export default PositionInfo;
