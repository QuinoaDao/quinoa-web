import React, { useState, useEffect } from "react";
import "./vaultdetail.css";
import ListStrategy from "../components/listStrategy";
import TitleDetailWrap from "../components/titleDetailwrap";
import SelectToken from "../components/SelectToken";
import { useTokenHoldingInfo } from "../hooks/useTokenHoldingInfo";
import { useProductInfo } from "../hooks/useProductInfo";
import { ethers } from "ethers";
import { UnderlyingTokenList } from "../components/UnderlyingTokenList";
import { useUnderlyingTokenPrice } from "../hooks/useUnderlyingTokenPrice";
import { ProductInfo, UnderlyingTokenInfo } from "../models/ProductInfo";
import Skeleton from "../components/skeleton";

const Vaultdetail = ({
  currentAccount,
  provider,
  mm,
  setIsLoaded, // metamask
}: any) => {
  const productInfo = useProductInfo(provider);
  const [showOption, setShowOption] = useState(false);
  const [buyToken, setBuyToken] = useState<UnderlyingTokenInfo | undefined>(
    productInfo?.underlyingTokens[0]
  );
  const [sellToken, setSellToken] = useState<UnderlyingTokenInfo | undefined>(
    productInfo?.underlyingTokens[0]
  );
  const [orderStatus, setOrderStatus] = useState("buy");
  const [buyAmount, setBuyAmount] = useState(0);
  const [sellAmount, setSellAmount] = useState(0);
  const [priceChangStat, setPriceChangeStat] = useState("up");
  const [priceChangePercent, setPriceChangePercent] = useState(0);
  const [loadSkeleton, setLoadSkeleton] = useState(true);

  const buyTokenHoldings = useTokenHoldingInfo(
    currentAccount,
    buyToken,
    provider
  );

  useEffect(() => {
    if (productInfo !== undefined && productInfo.underlyingTokens.length > 0) {
      setIsLoaded(true);
    }
    setBuyToken(productInfo?.underlyingTokens[0]);
    setSellToken(productInfo?.underlyingTokens[0]);
  }, [productInfo]);

  console.log("*******", productInfo);

  const calculatePriceChange = (productInfo: ProductInfo) => {
    let currentPrice = parseFloat(
      ethers.utils.formatEther(productInfo.currentPrice)
    );
    if (1 - currentPrice > 0) {
      setPriceChangeStat("down");
      setPriceChangePercent((currentPrice - 1) * -1 * 100);
    } else {
      setPriceChangeStat("up");
      setPriceChangePercent((currentPrice - 1) * 100);
    }
  };

  const handleBuyAmountChange = (e: any) => {
    setBuyAmount(e.target.value);
  };

  const handleSellAmountChange = (e: any) => {
    setSellAmount(e.target.value);
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

  if (
    productInfo === undefined ||
    productInfo.underlyingTokens.length === 0 ||
    productInfo.underlyingTokens[3].dollarPrice === undefined
  ) {
    return <Skeleton />;
  } else {
    return (
      <body id="body_wrap">
        <div className="infomain_wrap">
          <TitleDetailWrap
            vaultName="Static Allocation Product"
            dacName="Quinoa quant"
            propensity="Moderate"
          />
          <div className="spacing_26px"></div>
          <div className="Intro_wrap">
            <span className="Introduction">Introduction</span>
            <span className="Intro_txt">
              'USD Based Static Asset Allocation' operates a strategy of
              rebalancing investments to maintain a consistent mix of different
              asset classes. This strategy helps reduce risk and maximize
              returns, but requires regular monitoring to ensure desired
              percentages are maintained. Investors often use this strategy to
              maintain a consistent level of diversification and risk exposure
              in their portfolios.
            </span>
            <div className="tag_wrap">
              <div className="tag">
                <span className="tag_name">Stable coin</span>
              </div>
              <div className="tag">
                <span className="tag_name">Top10 marketcap</span>
              </div>
            </div>
            <div className="spacing_33px_underline"></div>
          </div>
          <div className="spacing_51px"></div>
          <div className="vault_priceinfo">
            <div className="aum">
              <span className="About_txt_short">AUM(TVL)</span>
              <span className="number_txt">
                ${productInfo?.tvl.toString()}
                <span className="othercolor">.04</span>
              </span>
            </div>
            <div className="currentprice">
              <span className="About_txt_short">Current Price</span>
              <span className="number_txt">
                $
                {productInfo?.currentPrice === undefined
                  ? 0
                  : ethers.utils.formatEther(productInfo?.currentPrice)}
              </span>
            </div>
            <div className="percentchange">
              <span className="About_txt_short">Percent Change</span>
              {/*up/down 에 따라 percent_txt 클래스 바꿔주기*/}
              <span className="percent_txt">
                <span className="pc_icon">
                  {priceChangStat === "up" ? (
                    <img src="/asset/pc_icon_up.svg" />
                  ) : (
                    <img src="/asset/pc_icon_down.svg" />
                  )}
                </span>
                <span>{priceChangePercent}%</span>
              </span>
            </div>
          </div>
          <div className="spacing_33px"></div>
          <div>
            <UnderlyingTokenList
              tokens={productInfo?.underlyingTokens}
              setLoadSkeleton={setLoadSkeleton}
            />
          </div>
          <div className="maintitle_wrap">
            <div className="spacing_100px"></div>
            <span className="maintitle_txt">Performance</span>
            <div className="maintitleUnderline"></div>
          </div>
          <div className="performance_wrap">
            <div className="performance">
              <div className="percentChange_row">
                <div className="spacing_1px"></div>
                <span>24%</span>
                <span>19%</span>
                <span>14%</span>
                <span>9%</span>
                <span>4%</span>
              </div>
              <div className="performance_monthly">
                <div className="before_7m before_nm">
                  <div className="vaultCircle"></div>
                  <div className="benchCircle"></div>
                  <span className="bm_txt">07, 2022</span>
                </div>
                <div className="before_6m before_nm">
                  <div className="vaultCircle"></div>
                  <div className="benchCircle"></div>
                  <span className="bm_txt">08, 2022</span>
                </div>
                <div className="before_5m before_nm">
                  <div className="vaultCircle"></div>
                  <div className="benchCircle"></div>
                  <span className="bm_txt">09, 2022</span>
                </div>
                <div className="before_4m before_nm">
                  <div className="vaultCircle"></div>
                  <div className="benchCircle"></div>
                  <span className="bm_txt">10, 2022</span>
                </div>
                <div className="before_3m before_nm">
                  <div className="vaultCircle"></div>
                  <div className="benchCircle"></div>
                  <span className="bm_txt">11, 2022</span>
                </div>
                <div className="before_2m before_nm">
                  <div className="vaultCircle"></div>
                  <div className="benchCircle"></div>
                  <span className="bm_txt">12, 2022</span>
                </div>
                <div className="before_1m before_nm">
                  <div className="vaultCircle"></div>
                  <div className="benchCircle"></div>
                  <span className="bm_txt">01, 2023</span>
                </div>
              </div>
            </div>
            <div className="performancesort_wrap">
              <div className="spacing_64px"></div>
              <div className="performance_sort">
                <div className="vault_per_info">
                  <div className="vp_icon"></div>
                  <span className="vp_txt">Stable Defi Fund</span>
                </div>
                <div className="benchmark_per_info">
                  <div className="bm_icon"></div>
                  <span className="bm_txt">Benchmark</span>
                </div>
              </div>
            </div>
          </div>
          <div className="maintitle_wrap">
            <div className="spacing_100px"></div>
            <span className="maintitle_txt">About</span>
            <div className="maintitleUnderline"></div>
          </div>
          <div className="spacing_28px"></div>
          <div className="about_list">
            <div className="creator_wrap al_wrap">
              <span className="name">Quinoa quant</span>
              <span className="txt">Creator</span>
            </div>
            <div className="inceptiondate_wrap al_wrap">
              <span className="name">May 5, 2022</span>
              <span className="txt">Inception Date</span>
            </div>
            <div className="network_wrap al_wrap">
              <span className="name">on Ethereum</span>
              <span className="txt">Network</span>
            </div>
            <div className="contract_wrap al_wrap">
              <a href="">
                <span className="name">View Contract</span>
              </a>
              <span className="txt">Contract Link</span>
            </div>
          </div>
          <div className="maintitle_wrap">
            <div className="spacing_100px"></div>
            <span className="maintitle_txt">Stat</span>
            <div className="maintitleUnderline"></div>
          </div>
          <div className="spacing_28px"></div>
          <div className="stat_list">
            <div className="aum_wrap st_wrap">
              <span className="name">${productInfo?.tvl.toString()}</span>
              <span className="txt">AUM(TVL)</span>
            </div>
            <div className="propensity_wrap st_wrap">
              <span className="name">Agressive</span>
              <span className="txt">Propensity</span>
            </div>
            <div className="protocolfee_wrap st_wrap">
              <span className="name">0.00%</span>
              <span className="txt">Protocol Fee</span>
            </div>
            <div className="managefee_wrap st_wrap">
              <span className="name">0.00%</span>
              <span className="txt">Management Fee</span>
            </div>
          </div>
        </div>

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
                      onClick={() => setBuyAmount(buyTokenHoldings * 0.1)}
                    >
                      <span>10%</span>
                    </div>
                    <div
                      className="txt_wrap"
                      onClick={() => setBuyAmount(buyTokenHoldings * 0.25)}
                    >
                      <span>25%</span>
                    </div>
                    <div
                      className="txt_wrap"
                      onClick={() => setBuyAmount(buyTokenHoldings * 0.5)}
                    >
                      <span>50%</span>
                    </div>
                    <div
                      className="txt_wrap"
                      onClick={() => setBuyAmount(buyTokenHoldings)}
                    >
                      <span>MAX</span>
                    </div>
                  </div>
                </div>
                <div className="spacing_14px"></div>
                <div className="convertedValue_wrap">
                  <span className="cv_txt">Converted value</span>
                  <span className="cv_price">
                    $ {convertPrice(buyToken?.symbol, buyAmount)}
                  </span>
                </div>
                <div className="spacing_20px"></div>
                <div className="spacing_line"></div>
                <div className="spacing_15px"></div>
                <div className="invested_wrap">
                  <span className="iv_txt">Amount invested</span>
                  <span className="iv_price">$ 321.48</span>
                </div>
                <div className="spacing_8px"></div>
                <div className="investableAmount_wrap">
                  <span className="ia_txt">Investable amount</span>
                  <span className="ia_price">
                    {buyTokenHoldings} {buyToken?.symbol}
                  </span>
                </div>
                <div className="spacing_67px"></div>
                <div className="orderbtn_wrap">
                  <span className="btn">Order</span>
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
                    <div className="txt_wrap">
                      <span>10%</span>
                    </div>
                    <div className="txt_wrap">
                      <span>25%</span>
                    </div>
                    <div className="txt_wrap">
                      <span>50%</span>
                    </div>
                    <div className="txt_wrap">
                      <span>MAX</span>
                    </div>
                  </div>
                </div>
                <div className="spacing_14px"></div>
                <div className="convertedValue_wrap">
                  <span className="cv_txt">Converted value</span>
                  <span className="cv_price">
                    $ {convertPrice(sellToken?.symbol, sellAmount)}
                  </span>
                </div>
                <div className="spacing_20px"></div>
                <div className="spacing_line"></div>
                <div className="spacing_15px"></div>
                <div className="investableAmount_wrap">
                  <span className="ia_txt">Sellable amount</span>
                  <span className="ia_price">391,707.0271 USDC</span>
                </div>
                <div className="spacing_67px"></div>
                <div className="orderbtn_wrap">
                  <span className="btn">Order</span>
                </div>
              </div>
            )}
          </div>
        </div>
      </body>
    );
  }
};
export default Vaultdetail;
