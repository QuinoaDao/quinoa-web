import { BigNumber } from "ethers";
import { useEffect, useState } from "react";
import { PositionInfo } from "../models/PositionInfo";

export const usePositionInfo = (currentAddress: any, shareBalance: any, investedValue: any, ethereum: Window["ethereum"]) => {
  const [positionInfo, setPositionInfo] = useState<PositionInfo>();
  
  const GetPositionInfo = async (shareBalance: any, investedValue: any) => {
    shareBalance = BigNumber.from(shareBalance);
    investedValue = BigNumber.from(investedValue);

    let averageUnitPrice = "0";

    let totalReturn = "0";

    let totalReturnChange = "0";

    setPositionInfo({
      averageUnitPrice,
      totalReturn,
      totalReturnChange
    })
  }

  useEffect(() => {
    GetPositionInfo(shareBalance, investedValue);
  }, [currentAddress, shareBalance, investedValue]);

  return positionInfo;
};
