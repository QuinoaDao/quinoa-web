import React from "react";
import { ReactComponent as Vaultimg01 } from "../components/asset/vault_img_01.svg";

const VaultDetailInfo = (props: any) => {
  return (
    <>
    <div className="detail_wrap">
      <div className="vaultTitle_wrap">
        <div className="vault_title">
          <div className="vault_img">
            <img src="/asset/vault_img_01.svg" />
          </div>
          <div className="nametxt">
            <span className="vaultname">{props.vaultName}</span>
            <span className="dacname">{props.dacName}</span>
          </div>
        </div>
        <div className="propensity">
          <span className="prop_mod">{props.propensity}</span>
        </div>
      </div>
    </div>
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
    </div>
    </>
  );
};

export default VaultDetailInfo;
