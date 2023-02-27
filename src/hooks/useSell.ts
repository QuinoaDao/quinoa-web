import { useState, useEffect, useCallback } from "react";
import { BigNumberish, ethers } from "ethers";
import product_abi from "../abis/IProduct.json";
import erc20_abi from "../abis/ERC20.json";



export const useSell = (amount: any, assetInfo: any, currentAccount: any, ethereum: Window["ethereum"]) => {
    const signer = new ethers.providers.Web3Provider(ethereum).getSigner();
    const [sellTxStatus, setTxStatus] = useState<string>("default");
    const sell = useCallback(
        async (amount: any, assetAddress: any, assetDecimal: any) => {
            const productAddress: string = process.env.REACT_APP_PRODUCT_ADDRESS || "";
            const product = new ethers.Contract(
                productAddress,
                product_abi.abi,
                signer
              );
              try {
                console.log(amount,assetAddress);
                const mintTx = await product.withdraw(assetAddress, ethers.utils.parseUnits(amount.toString(), assetDecimal), currentAccount, currentAccount);
                console.log("SELL")
                console.log(mintTx);
                setTxStatus("pending");
                const receipt = await mintTx.wait();
                console.log(!!receipt.blockHash ? "success" : "error");
                setTxStatus(!!receipt.blockHash ? "success" : "error");
            }
            
            catch(e) {
                console.log(e);
                setTxStatus("error");
            }
        },
    [amount, assetInfo, currentAccount, signer]);
    useEffect(() => {
        if(sellTxStatus === "error") {
            setTimeout(() => {
                setTxStatus("default")
            }, 8000)
        }
        else if (sellTxStatus === "success") {
            setTimeout(() => {
                setTxStatus("default")
            }, 4000)
        }
    }, [sellTxStatus])
    return {sell, sellTxStatus};
};