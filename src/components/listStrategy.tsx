import React from "react";
import { roundNumbers } from "../utils/MathUtils";
//TODO: 실제 토큰에 맞춰서 컬러값 추가해주기
const colormap = {
  USDC: "rgba(62,115,196,1)",
  WMATIC: "rgba(95,180,246,1)",
  WETH: "rgba(218,85,138,1)",
  LINK: "rgba(61,91,203,1)",
  QUICK: "#282F6E"
};
const ListStrategy = (props: any) => {

  const default_bar_styles = {
    background: colormap[props.symbol as keyof typeof colormap],
  };
  const bar_styles = {
    width: "calc(" + props.balancePercent + "%)",
    background: colormap[props.symbol as keyof typeof colormap],
  };
  const text_wrap_styles = {
    left: "calc(" + props.balancePercent + "%)",
  };
  const text_styles = {
    color: colormap[props.symbol as keyof typeof colormap],
  };

  return (
    <div className="list_strategy">
      <div className="token">
        <div className="tokenImg_wrap">
          <img src={props.tokenImage} />
        </div>
        <span className="token_txt">{props.tokenName}</span>
      </div>
      <div className="Quantity">
        <span className="number">{roundNumbers(props.quantity)}</span>
        <span className="token_name">{props.tokenUnit}</span>
      </div>
      <div className="TokenPrice">
        <span className="totalVolume">
          ${roundNumbers(props.tokenPrice)}
        </span>
      </div>
      <div className="Balance">
        <span className="balance_percent">{props.balancePercent}%</span>
      </div>
      {props.percentChange > 0 ? (
        <div className="PercentChange">
          <div className="up_icon">
            <img src="/asset/ut_up_icon.svg" />
          </div>
          <span className="totalVolume up">
            {roundNumbers(props.percentChange)}%
          </span>
        </div>
      ) : (
        <div className="PercentChange">
          <div className="down_icon">
            <img src="/asset/ut_down_icon.svg" />
          </div>
          <span className="totalVolume down">
            {roundNumbers(props.percentChange)}%
          </span>
        </div>
      )}

      <div className="Totalvalue">
        <span className="tv_txt">${roundNumbers(props.totalValue)}</span>
      </div>
      <div className="balancegraphline_wrap">
        <div className="graphline_wrap">
          <div className={`default`} style={default_bar_styles}></div>
          <div className={`balance`} style={bar_styles}></div>
          <div className={`balanceline_txt`} style={text_wrap_styles}>
            <span style={text_styles}>{props.balancePercent}%</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ListStrategy;
