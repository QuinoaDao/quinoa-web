import React, { useState, useEffect } from "react";
import TitleDetailWrap from "./vaultDetailInfo";
import SelectToken from "./selectToken";
import { useTokenHoldingInfo } from "../hooks/useTokenHoldingInfo";
import { useProductInfo } from "../hooks/useProductInfo";
import { UnderlyingTokenList } from "./underlyingTokenList";
import { ProductInfo, UnderlyingTokenInfo } from "../models/ProductInfo";
import { useBuy } from "../hooks/useBuy";
import { useInvestedAmountInfo } from "../hooks/useInvestedAmountInfo";
import { useSellableAmountInfo } from "../hooks/useSellableAmountInfo";
import { useSell } from "../hooks/useSell";
import { Toast, toastProperties } from "./modals/toast";
import { roundNumbers } from "../utils/MathUtils";

export const BuySellBox = ({
  connectWallet,
  changeNetwork,
  currentAccount,
  provider,
  mm, // metamask
  productInfo,
}: any) => {
  const [showOption, setShowOption] = useState(false);
  const [orderStatus, setOrderStatus] = useState("buy");
  const [buyToken, setBuyToken] = useState<UnderlyingTokenInfo | undefined>(
    productInfo?.underlyingTokens[0]
  );
  const [sellToken, setSellToken] = useState<UnderlyingTokenInfo | undefined>(
    productInfo?.underlyingTokens[0]
  );
  const [buyAmount, setBuyAmount] = useState("");
  const [sellAmount, setSellAmount] = useState("");
  const [shareBalance, setShareBalance] = useState();
  const [toastList, setToastList] = useState<
    toastProperties["data"] | undefined
  >();

  const buyTokenHoldings = useTokenHoldingInfo(currentAccount, buyToken, mm);

  const amountInvested = useInvestedAmountInfo(
    currentAccount,
    mm,
    setShareBalance
  );
  const { buy, buyTxStatus } = useBuy(buyAmount, buyToken, currentAccount, mm);
  const { sell, sellTxStatus } = useSell(
    sellAmount,
    sellToken,
    currentAccount,
    mm
  );
  const sellableTokenAmount = useSellableAmountInfo(
    currentAccount,
    shareBalance,
    sellToken,
    mm
  );

  useEffect(() => {
    setBuyToken(productInfo?.underlyingTokens[0]);
    setSellToken(productInfo?.underlyingTokens[0]);
  }, [productInfo]);

  useEffect(() => {
    showToast(buyTxStatus);
    // console.log("arstarstarstarst",buyTxStatus)
  }, [buyTxStatus]);

  useEffect(() => {
    showToast(sellTxStatus);
    // console.log("arstarstarstarst",sellTxStatus)
  }, [sellTxStatus]);

  const handleBuyAmountChange = (e: any) => {
    setBuyAmount(e.target.value.replace(/^0+(?!\.|$)/, ""));
  };

  const handleSellAmountChange = (e: any) => {
    setSellAmount(e.target.value.replace(/^0+(?!\.|$)/, ""));
  };

  const handleOrderBnt = async (
    opt: string,
    tokenAmount: any,
    tokenAddress: any
  ) => {
    if (tokenAmount == undefined || tokenAmount == "" || tokenAmount == "0") {
      return;
    }
    if (tokenAddress == undefined) {
      return;
    }

    if (
      (await mm.request({ method: "eth_accounts" })) == undefined ||
      (await mm.request({ method: "eth_accounts" })).length == 0
    ) {
      await connectWallet();
    }
    if (mm.networkVersion != (process.env.REACT_APP_NETWORK_ID || "0x89")) {
      await changeNetwork();
    }

    if (opt == "buy") {
      buy(tokenAmount, tokenAddress);
    } else if (opt == "sell") {
      sell(tokenAmount, tokenAddress);
    }
  };

  const closeToast: toastProperties["close"] = () => {
    setToastList(undefined);
  };

  let toastProperty: toastProperties["data"];
  const showToast = (type: string) => {
    switch (type) {
      case "default":
        toastProperty = undefined;
        break;
      case "pending":
        toastProperty = {
          title: "Pending",
          description: "This may take up to a minute.",
          backgroundColor: "#5bc0de",
        };
        break;
      case "error":
        toastProperty = {
          title: "Failed",
          description: "Transaction reverted ",
          backgroundColor: "#f0ad4e",
        };
        break;
      case "success":
        toastProperty = {
          title: "Success",
          description: "Transaction closed successfully",
          backgroundColor: "#5cb85c",
        };
        break;
      default:
        toastProperty = undefined;
    }
    setToastList(toastProperty);
  };

  const convertPrice = (symbol: string | undefined, amount: number) => {
    if (productInfo === undefined || symbol === undefined) {
      return 0;
    } else {
      for (let i = 0; i < productInfo.underlyingTokens.length; i++) {
        if (productInfo.underlyingTokens[i].symbol === symbol) {
          return productInfo.underlyingTokens[i].dollarPrice * amount;
        }
      }
    }
  };
  return (
    <div>
      <div className="buysellBox_wrap">
        <div className="buysellbtn_wrap">
          <input
            id="buytab"
            type="radio"
            name="btn_wrap"
            onClick={() => {
              setOrderStatus("buy");
              if (showOption) {
                setShowOption(false);
              }
            }}
            checked={orderStatus === "buy" ? true : false}
          />
          <label className="btn_wrap buybtn" htmlFor="buytab">
            Buy
          </label>
          <input
            id="selltab"
            type="radio"
            name="btn_wrap"
            onClick={() => {
              setOrderStatus("sell");
              if (showOption) {
                setShowOption(false);
              }
            }}
            checked={orderStatus === "sell" ? true : false}
          />
          <label className="btn_wrap sellbtn" htmlFor="selltab">
            Sell
          </label>
          <div className="spacing_24px"></div>
          {orderStatus == "buy" ? (
            <div id="buytab_content">
              <div className="investin_wrap">
                <span className="investIn">Invest In</span>
                <button className="selectbox_wrap">
                  <div
                    className="selectbox"
                    onClick={() => setShowOption(!showOption)}
                  >
                    <div className="token">
                      <img src={buyToken?.logo} />
                      <span className="token_name">{buyToken?.symbol}</span>
                    </div>
                  </div>
                  {showOption ? (
                    <SelectToken
                      underlyingTokens={productInfo?.underlyingTokens}
                      selectedToken={buyToken}
                      setSelectedToken={setBuyToken}
                      setShowOption={setShowOption}
                    />
                  ) : null}
                </button>
              </div>
              <div className="amount_wrap">
                <span className="amount">Amount</span>
                <div className="amount_inputbox_wrap">
                  <input
                    type="number"
                    name="st_id"
                    placeholder="0.00"
                    className="amount_inputbox"
                    value={buyAmount.toString()}
                    onChange={handleBuyAmountChange}
                  />
                </div>
              </div>
              <div className="asbtn_wrap">
                <div className="amount_select_btn">
                  <div
                    className="txt_wrap"
                    onClick={() =>
                      setBuyAmount((buyTokenHoldings * 0.1).toString())
                    }
                  >
                    <span>10%</span>
                  </div>
                  <div
                    className="txt_wrap"
                    onClick={() =>
                      setBuyAmount((buyTokenHoldings * 0.25).toString())
                    }
                  >
                    <span>25%</span>
                  </div>
                  <div
                    className="txt_wrap"
                    onClick={() =>
                      setBuyAmount((buyTokenHoldings * 0.5).toString())
                    }
                  >
                    <span>50%</span>
                  </div>
                  <div
                    className="txt_wrap"
                    onClick={() => setBuyAmount(buyTokenHoldings.toString())}
                  >
                    <span>MAX</span>
                  </div>
                </div>
              </div>
              <div className="spacing_14px"></div>
              <div className="convertedValue_wrap">
                <span className="cv_txt">Converted value</span>
                <span className="cv_price">
                  $ {convertPrice(buyToken?.symbol, Number(buyAmount))}
                </span>
              </div>
              <div className="spacing_20px"></div>
              <div className="spacing_line"></div>
              <div className="spacing_15px"></div>
              <div className="invested_wrap">
                <span className="iv_txt">Amount invested</span>
                <span className="iv_price">
                  $ {roundNumbers(amountInvested)}
                </span>
              </div>
              <div className="spacing_8px"></div>
              <div className="investableAmount_wrap">
                <span className="ia_txt">Investable amount</span>
                <span className="ia_price">
                  {roundNumbers(buyTokenHoldings)} {buyToken?.symbol}
                </span>
              </div>
              <div className="spacing_67px"></div>
              <div className="amount_error">
                <div className="errorIcon">
                  <img src="./asset/amount_error.svg" />
                </div>
                <p className="error_txt">
                  Don't have enough ETH to buy this product.
                </p>
                {/* <p className="error_txt"> Please enter an amount.</p> */}
                <div className="spacing_9px"></div>
              </div>
              <div className="orderbtn_wrap">
                <span
                  className="btn"
                  onClick={() => {
                    handleOrderBnt("buy", buyAmount, buyToken?.address);
                  }}
                >
                  Order
                </span>
              </div>
            </div>
          ) : (
            <div id="selltab_content">
              <div className="investin_wrap">
                <span className="investIn">Sell In</span>
                <button className="selectbox_wrap">
                  <div
                    className="selectbox"
                    onClick={() => setShowOption(!showOption)}
                  >
                    <div className="token">
                      <img src={sellToken?.logo} />
                      <span className="token_name">{sellToken?.symbol}</span>
                    </div>
                  </div>
                  {showOption ? (
                    <SelectToken
                      underlyingTokens={productInfo?.underlyingTokens}
                      selectedToken={sellToken}
                      setSelectedToken={setSellToken}
                      setShowOption={setShowOption}
                    />
                  ) : null}
                </button>
              </div>
              <div className="amount_wrap">
                <span className="amount">Amount</span>
                <div className="amount_inputbox_wrap">
                  <input
                    type="number"
                    name="st_id"
                    placeholder="0.00"
                    className="amount_inputbox"
                    value={sellAmount.toString()}
                    onChange={handleSellAmountChange}
                  />
                </div>
              </div>
              <div className="asbtn_wrap">
                <div className="amount_select_btn">
                  <div
                    className="txt_wrap"
                    onClick={() =>
                      setBuyAmount((sellableTokenAmount * 0.1).toString())
                    }
                  >
                    <span>10%</span>
                  </div>
                  <div
                    className="txt_wrap"
                    onClick={() =>
                      setSellAmount((sellableTokenAmount * 0.25).toString())
                    }
                  >
                    <span>25%</span>
                  </div>
                  <div
                    className="txt_wrap"
                    onClick={() =>
                      setSellAmount((sellableTokenAmount * 0.5).toString())
                    }
                  >
                    <span>50%</span>
                  </div>
                  <div
                    className="txt_wrap"
                    onClick={() =>
                      setSellAmount((sellableTokenAmount * 0.1).toString())
                    }
                  >
                    <span>MAX</span>
                  </div>
                </div>
              </div>
              <div className="spacing_14px"></div>
              <div className="convertedValue_wrap">
                <span className="cv_txt">Converted value</span>
                <span className="cv_price">
                  $ {convertPrice(sellToken?.symbol, Number(sellAmount))}
                </span>
              </div>
              <div className="spacing_20px"></div>
              <div className="spacing_line"></div>
              <div className="spacing_15px"></div>
              <div className="investableAmount_wrap">
                <span className="ia_txt">Sellable amount</span>
                <span className="ia_price">
                  {roundNumbers(sellableTokenAmount)} {sellToken?.symbol}
                </span>
              </div>
              <div className="spacing_67px"></div>
              <div className="orderbtn_wrap">
                <span
                  className="btn"
                  onClick={() => {
                    handleOrderBnt("sell", sellAmount, sellToken?.address);
                  }}
                >
                  Order
                </span>
              </div>
            </div>
          )}
        </div>
      </div>
      <Toast data={toastList} close={closeToast} />
    </div>
  );
};
