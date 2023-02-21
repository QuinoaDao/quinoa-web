import React, { useState, useEffect } from "react";
import "./vaultdetail.css";
import TitleDetailWrap from "../components/titleDetailwrap";
import { useProductInfo } from "../hooks/useProductInfo";
import { UnderlyingTokenList } from "../components/UnderlyingTokenList";
import { BuySellBox } from "../components/BuySellBox";
import { BuySellBoxSkeleton } from "../components/BuySellBoxSkeleton";

const Vaultdetail = ({
  currentAccount,
  provider,
  mm, // metamask
}: any) => {
  const productInfo = useProductInfo(provider);

  const [priceChangStat, setPriceChangeStat] = useState("up");
  const [priceChangePercent, setPriceChangePercent] = useState(0);

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
          <div className="positionInfo_wrap">
            <div className="positionInfo investmentValue">
              <span className="txt">Your Investment Value</span>
              <span className="number">$32.101.38</span>
            </div>
            <div className="positionInfo averageUnitprice">
              <span className="txt">Your Average unit price</span>
              <span className="number">$101.38</span>
            </div>
            <div className="positionInfo totalReturn">
              <span className="txt">Total Return</span>
              <div className="totalReturn_txt">
                <span className="position_icon">
                  <img src="/asset/tr_icon_up.svg" />
                </span>
                <span className="tr_number">$401.38</span>
                <span className="tr_percent">(99.99%)</span>
              </div>
            </div>
          </div>
          <div className="spacing_33px_underline"></div>
        </div>
        <div className="spacing_51px"></div>
        <div className="vault_priceinfo">
          <div className="aum">
            <span className="About_txt_short">AUM(TVL)</span>
            {productInfo === undefined ? (
              <div className="s_number_txt"></div>
            ) : (
              <span className="number_txt">${productInfo?.tvl}</span>
            )}
          </div>
          <div className="currentprice">
            <span className="About_txt_short">Current Price</span>
            {productInfo === undefined ? (
              <div className="s_number_txt"></div>
            ) : (
              <span className="number_txt">${productInfo?.currentPrice}</span>
            )}
          </div>
          <div className="percentchange">
            <span className="About_txt_short">Percent Change</span>
            <span className="percent_txt">
              <span className="pc_icon">
                {priceChangStat === "up" ? (
                  <img src="/asset/pc_icon_up.svg" />
                ) : (
                  <img src="/asset/pc_icon_down.svg" />
                )}
              </span>
              {productInfo === undefined ? (
                <div className="s_number_txt"></div>
              ) : (
                <span>{priceChangePercent}%</span>
              )}
            </span>
          </div>
        </div>
        <div className="spacing_33px"></div>
        <div>
          <UnderlyingTokenList tokens={productInfo?.underlyingTokens} />
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
            {productInfo === undefined ? (
              <div className="s_name"></div>
            ) : (
              <span className="name">${productInfo?.tvl.toString()}</span>
            )}
            <span className="txt">AUM(TVL)</span>
          </div>
          <div className="propensity_wrap st_wrap">
            {productInfo === undefined ? (
              <div className="s_name"></div>
            ) : (
              <span className="name">Agressive</span>
            )}
            <span className="txt">Propensity</span>
          </div>
          <div className="protocolfee_wrap st_wrap">
            <span className="name">0.00%</span>
            <span className="txt">Protocol Fee</span>
          </div>
          <div className="managefee_wrap st_wrap">
            {productInfo === undefined ? (
              <div className="s_name"></div>
            ) : (
              <span className="name">0.00%</span>
            )}
            <span className="txt">Management Fee</span>
          </div>
        </div>
      </div>
      {productInfo === undefined ? (
        <BuySellBoxSkeleton />
      ) : (
        <BuySellBox
          currentAccount={currentAccount}
          provider={provider}
          mm={mm}
          productInfo={productInfo}
        />
      )}
    </body>
  );
};
export default Vaultdetail;
