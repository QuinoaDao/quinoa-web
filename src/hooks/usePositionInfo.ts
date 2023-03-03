import { BigNumber, ethers, utils } from "ethers";
import { useEffect, useState } from "react";
import { PositionInfo } from "../models/PositionInfo";
import product_abi from "../abis/IProduct.json";
import { hexZeroPad, parseEther } from "ethers/lib/utils";

const decodeLogs = (logs: any) => {
  return logs.map((cur: any) => {
    return utils.defaultAbiCoder.decode(['uint256', 'uint256', 'uint256', 'uint256'], cur.data);
  }, []);
}

const calcUnitPrice = (depositData: any, withdrawalData: any) => {
  let depositIdx = 0;
  let withdrawalIdx = 0;

  let result = [BigNumber.from(0), BigNumber.from(0)]; // 수량, 평단가
  
  while(depositIdx < depositData.length || withdrawalIdx < withdrawalData.length) {

    if(withdrawalIdx == withdrawalData.length || depositData[depositIdx][3] < withdrawalData[withdrawalIdx][3]) { // deposit이 수행된 경우
      let prevValue = result[0].mul(result[1]);
      let additinalValue = depositData[depositIdx][1].mul(depositData[depositIdx][2]);

      result[0] = result[0].add(depositData[depositIdx][1]);
      result[1] = (prevValue.add(additinalValue)).div(result[0]);

      depositIdx += 1;
    }
    else { // withdraw가 수행된 경우
      result[0] = result[0].sub(withdrawalData[withdrawalIdx][1]);
      
      withdrawalIdx += 1;
    }
  }

  return result;
}

export const usePositionInfo = (currentAddress: any, shareBalance: any, investedValue: any, provider: any) => {
  const [positionInfo, setPositionInfo] = useState<PositionInfo>();
  
  const GetPositionInfo = async (currentAddress: any, shareBalance: any, investedValue: any) => {
    shareBalance = BigNumber.from(shareBalance);
    investedValue = BigNumber.from(investedValue);
    const productAddress: string = process.env.REACT_APP_PRODUCT_ADDRESS || "";

    const product = new ethers.Contract(
      productAddress,
      product_abi.abi,
      provider
    );

    // Deposit event filter
    let depositFilter = {
      fromBlock: Number(process.env.REACT_APP_PRODUCT_BLOCKNUMBER),
      toBlock: 'latest',
      address: productAddress,
      topics: [
        utils.id("Deposit(address,address,uint256,uint256,uint256,uint256)"),
        null,
        hexZeroPad(currentAddress, 32) // receiver
      ]
    };

    // Withdraw event filter
    let withdrawalFilter = {
      fromBlock: Number(process.env.REACT_APP_PRODUCT_BLOCKNUMBER),
      toBlock: 'latest',
      address: productAddress,
      topics: [
        utils.id("Withdraw(address,address,address,uint256,uint256,uint256,uint256)"),
        null,
        hexZeroPad(currentAddress, 32) // receiver
      ]
    };

    const [depositDecodedLogs, withdrawalDecodedLogs] = await Promise.all([
      decodeLogs(await provider.getLogs(depositFilter)),
      decodeLogs(await provider.getLogs(withdrawalFilter))
    ])

    let unitPriceInfo = calcUnitPrice(depositDecodedLogs, withdrawalDecodedLogs);
    let depositValue = (unitPriceInfo[0].mul(unitPriceInfo[1])).div(parseEther("1"));

    if(depositValue.lte(investedValue)) { // depositValue <= investedValue
      // invested value가 더 큼 => 현재 내가 이득을 보고 있음
      setPositionInfo({
        averageUnitPrice: unitPriceInfo[1],
        totalReturn: investedValue.sub(depositValue),
        totalReturnChange: ((investedValue.sub(depositValue)).mul(100).div(depositValue)),
        investStat: "up"
      })
    }
    else {
      // deposit value가 더 큼 => 현재 내가 손해를 보고 있음
      setPositionInfo({
        averageUnitPrice: unitPriceInfo[1],
        totalReturn: depositValue.sub(investedValue),
        totalReturnChange: ((depositValue.sub(investedValue)).mul(parseEther("100")).div(depositValue)),
        investStat: "down"
      })
    }
  }

  useEffect(() => {
    GetPositionInfo(currentAddress, shareBalance, investedValue);
  }, [currentAddress, shareBalance, investedValue]);

  return positionInfo;
};
