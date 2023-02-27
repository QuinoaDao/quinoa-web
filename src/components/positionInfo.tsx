import { formatEther } from "ethers/lib/utils";
import React, { useState } from "react";
import { usePositionInfo } from "../hooks/usePositionInfo";
import { roundNumbers } from "../utils/MathUtils";

const PositionInfo = ({currentAccount, shareBalance, investedValue, mm}: any) => {
  const positionInfo = usePositionInfo(currentAccount, shareBalance, investedValue, mm);

  return (
    <div className="positionInfo_wrap">
    <div className="positionInfo investmentValue">
      <span className="txt">Your Investment Value</span>
      <span className="number">${roundNumbers(formatEther(investedValue))}</span>
    </div>
    <div className="positionInfo averageUnitprice">
      <span className="txt">Your Average unit price</span>
      <span className="number">${positionInfo?.averageUnitPrice}</span>
    </div>
    <div className="positionInfo totalReturn">
      <span className="txt">Total Return</span>
      <div className="totalReturn_txt">
        <span className="position_icon">
          <img src="/asset/tr_icon_up.svg" />
        </span>
        <span className="tr_number">${positionInfo?.totalReturn}</span>
        <span className="tr_percent">({positionInfo?.totalReturnChange}%)</span>
      </div>
    </div>
    </div>
  );
};

export default PositionInfo;
