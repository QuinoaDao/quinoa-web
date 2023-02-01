import React from "react";
import { ReactComponent as Tokenicon_eth } from "./asset/token_icon_eth.svg";
import { ReactComponent as Uticon_up } from "./asset/ut_up_icon.svg";
const ListStrategy = (props: any) => {
  return (
    <div className="list_strategy">
      <div className="token">
        <div className="tokenImg_wrap">
          <Tokenicon_eth />
        </div>
        <span className="token_txt">{props.tokenName}</span>
      </div>
      <div className="Quantity">
        <span className="number">{props.quantity}</span>
        <span className="token_name">{props.tokenUnit}</span>
      </div>
      <div className="TokenPrice">
        <span className="totalVolume">{props.tokenPrice}</span>
      </div>
      <div className="Balance">
        <span className="balance_percent">{props.balancePercent}</span>
      </div>
      <div className="PercentChange">
        <div className="up_icon">
          <Uticon_up></Uticon_up>
        </div>
        <span className="totalVolume">{props.percentChange}</span>
      </div>
      <div className="Totalvalue">
        <span className="tv_txt">{props.totalValue}</span>
      </div>
      <div className="balancegraphline_wrap">
        <div className="graphline_wrap">
          <div className={`default${props.graphDefaultClass}`}></div>
          <div className={`balance${props.graphBalanceClass}`}></div>
          <div className={`balanceline${props.graphBalanceline}_txt`}>
            <span>{props.balancePercent}</span>
          </div>
        </div>
      </div>
      {/* <div className="list_strategy">
            <div className="token">
              <div className="tokenImg_wrap">
                <Tokenicon_eth></Tokenicon_eth>
              </div>
              <span className="token_txt">Ethereum</span>
            </div>
            <div className="Quantity">
              <span className="number">0.01830</span>
              <span className="token_name">ETH</span>
            </div>
            <div className="TokenPrice">
              <span className="totalVolume">$1,730.21</span>
            </div>
            <div className="Balance">
              <span className="balance_percent">50%</span>
            </div>
            <div className="PercentChange">
              <div className="up_icon">
                <Uticon_up></Uticon_up>
              </div>
              <span className="totalVolume">24.82%</span>
            </div>
            <div className="Totalvalue">
              <span className="tv_txt">$132.48</span>
            </div>
            <div className="balancegraphline_wrap">
              <div className="graphline_wrap">
                <div className="graphline_default eth-default"></div>
                <div className="graphline_balance eth-balance"></div>
                <div className="balanceline_txt">
                  <span>50%</span>
                </div>
              </div>
            </div>
          </div> */}
      {/* <div className="list_strategy">
            <div className="token">
              <div className="tokenImg_wrap">
                <Tokenicon_polygon></Tokenicon_polygon>
              </div>
              <span className="token_txt">Polygon</span>
            </div>
            <div className="Quantity">
              <span className="number">32.1430</span>
              <span className="token_name">MATIC</span>
            </div>
            <div className="TokenPrice">
              <span className="totalVolume">$1.03</span>
            </div>
            <div className="Balance">
              <span className="balance_percent">50%</span>
            </div>
            <div className="PercentChange">
              <div className="up_icon">
                <Uticon_up></Uticon_up>
              </div>
              <span className="totalVolume">4.82%</span>
            </div>
            <div className="Totalvalue">
              <span className="tv_txt">$32.48</span>
            </div>
            <div className="balancegraphline_wrap">
              <div className="graphline_wrap">
                <div className="graphline_default poly_default"></div>
                <div className="graphline_balance poly_balance"></div>
                <div className="balanceline_txt poly_txt">
                  <span>50%</span>
                </div>
              </div>
            </div>
          </div> */}
    </div>
  );
};

export default ListStrategy;
