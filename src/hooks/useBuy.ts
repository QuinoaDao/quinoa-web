import { useState, useEffect, useCallback } from "react";
import { BigNumberish, ethers } from "ethers";
import product_abi from "../abis/IProduct.json";
import erc20_abi from "../abis/ERC20.json";



export const useBuy = (amount: any, assetAddress: any, currentAccount: any, ethereum: Window["ethereum"]) => {
    const signer = new ethers.providers.Web3Provider(ethereum).getSigner();
    const [buyTxStatus, setTxStatus] = useState<string>("default");
    const buy = useCallback(
        async (amount: any, assetAddress: any) => {
            const productAddress: string = process.env.REACT_APP_PRODUCT_ADDRESS || "";
            const product = new ethers.Contract(
                productAddress,
                product_abi.abi,
                signer
              );
              try {
                let tokenContract = new ethers.Contract(assetAddress, erc20_abi.abi, signer);
                const approveTx = await tokenContract.approve(product.address, ethers.utils.parseUnits(amount.toString()));
                await approveTx.wait();
                setTxStatus("pending");
                const mintTx = await product.deposit(assetAddress, ethers.utils.parseUnits(amount.toString()), currentAccount);
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
    [amount, assetAddress, currentAccount, signer]);
    return {buy, buyTxStatus};
};