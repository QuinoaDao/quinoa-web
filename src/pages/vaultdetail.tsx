import React, { useState, useEffect } from "react";
import "./vaultdetail.css";
import ListStrategy from "../components/listStrategy";
import TitleDetailWrap from "../components/titleDetailwrap";
import SelectToken from "../components/SelectToken";
import { useTokenHoldingInfo } from "../hooks/useTokenHoldingInfo";

export interface TokenInterface {
  symbol: string;
  subName: string;
  address: string;
  decimal: number;
}
export const Tokens: TokenInterface[] = [
  {
    symbol: "USDC",
    subName: "USD Coin",
    address: "0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48",
    decimal: 6,
  },
  { symbol: "USDT", subName: "Tether", address: "", decimal: 18 },
  { symbol: "DAI", subName: "Dai", address: "", decimal: 18 },
  { symbol: "ETH", subName: "Ethereum", address: "", decimal: 18 },
  { symbol: "MATIC", subName: "Polygon", address: "", decimal: 18 },
];

const Vaultdetail = ({
  currentAccount,
  mm, // metamask
}: any) => {
  const [showOption, setShowOption] = useState(false);
  const [buyToken, setBuyToken] = useState(Tokens[0]);
  const [sellToken, setSellToken] = useState(Tokens[0]);
  const [orderStatus, setOrderStatus] = useState("buy");
  const [buyAmount, setBuyAmount] = useState(0);
  const [sellAmount, setSellAmount] = useState(0);

  const buyTokenHoldings = useTokenHoldingInfo(currentAccount, buyToken, mm);
  // const sellableAmount = useProductHoldingInfo()

  const handleBuyAmountChange = (e: any) => {
    setBuyAmount(e.target.value);
  };

  const handleSellAmountChange = (e: any) => {
    setSellAmount(e.target.value);
  };

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
            asset classes. This strategy helps reduce risk and maximize returns,
            but requires regular monitoring to ensure desired percentages are
            maintained. Investors often use this strategy to maintain a
            consistent level of diversification and risk exposure in their
            portfolios.
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
              $821,143<span className="othercolor">.04</span>
            </span>
          </div>
          <div className="currentprice">
            <span className="About_txt_short">Current Price</span>
            <span className="number_txt">$2,291.93</span>
          </div>
          <div className="percentchange">
            {/*percent up/down 에 따라 이미지 바꿔주기*/}
            <span className="About_txt_short">Percent Change</span>
            {/*up/down 에 따라 percent_txt 클래스 바꿔주기*/}
            <span className="percent_txt">
              <span className="pc_icon">
                <img src="/asset/pc_icon_up.svg" />
              </span>
              <span>21.39%</span>
            </span>
          </div>
        </div>
        <div className="spacing_33px"></div>
        <div className="ut_wrap">
          <header>
            <div className="column_first">
              <span className="column_txt">Underlying Tokens</span>
            </div>
            <div className="column_quantity">
              <div className="spacing_line"></div>
              <div className="spacing_14px"></div>
              <span className="column_txt">Quantity</span>
            </div>
            <div className="column_Tokenprice">
              <div className="spacing_line"></div>
              <div className="spacing_14px"></div>
              <span className="column_txt">Token Price</span>
            </div>
            <div className="column_Tokenbalance">
              <div className="spacing_line"></div>
              <div className="spacing_14px"></div>
              <span className="column_txt">Balance</span>
            </div>
            <div className="column_PercentChange">
              <div className="spacing_line"></div>
              <div className="spacing_14px"></div>
              <span className="column_txt">Percent Change</span>
            </div>
            <div className="column_Totalvalue">
              <div className="spacing_line"></div>
              <div className="spacing_14px"></div>
              <span className="column_txt">Total Value</span>
            </div>
          </header>
          <div className="headerUnderline"></div>

          <ListStrategy
            tokenName="Ethereum"
            quantity="0.01830"
            tokenUnit="ETH"
            tokenPrice="$1,730.21"
            balancePercent="50%"
            percentChange="4.82%"
            totalValue="$332.48"
            graphDefaultClass="eth"
            graphBalanceClass="eth"
            graphBalanceline="eth"
          />
          <ListStrategy
            tokenName="Polygon"
            quantity="32.1430"
            tokenUnit="MATIC"
            tokenPrice="$1.03"
            balancePercent="50%"
            percentChange="24.82%"
            totalValue="$32.48"
            graphDefaultClass="poly"
            graphBalanceClass="poly"
            graphBalanceline="poly"
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
            <span className="name">$840,201.02</span>
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
            onClick={() => setOrderStatus("buy")}
            checked={orderStatus === "buy" ? true : false}
          />
          <label className="btn_wrap buybtn" htmlFor="buytab">
            Buy
          </label>
          <input
            id="selltab"
            type="radio"
            name="btn_wrap"
            onClick={() => setOrderStatus("sell")}
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
                      <img src={"/asset/" + buyToken.symbol + ".svg"} />
                      <span className="token_name">{buyToken.symbol}</span>
                    </div>
                  </div>
                  {showOption ? (
                    <SelectToken
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
              {/* 클릭하면 amount 계산해서 값 넣어주기*/}
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
                <span className="cv_price">$ 32,910</span>
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
                  {buyTokenHoldings} {buyToken.symbol}
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
                      <img src={"/asset/" + sellToken.symbol + ".svg"} />
                      <span className="token_name">{sellToken.symbol}</span>
                    </div>
                  </div>
                  {showOption ? (
                    <SelectToken
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
                <span className="cv_price">$ 32,910</span>
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
};
export default Vaultdetail;
