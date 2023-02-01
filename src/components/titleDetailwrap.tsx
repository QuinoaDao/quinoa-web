import React from "react";
import { ReactComponent as Vaultimg01 } from "../components/asset/vault_img_01.svg";

const Titledetailwrap = (props: any) => {
  return (
    <div className="detail_wrap">
      <div className="vaultTitle_wrap">
        <div className="vault_title">
          <div className="vault_img">
            <Vaultimg01 />
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
      {/* <div className="detail_wrap">
          <div className="vaultTitle_wrap">
            <div className="vault_title">
              <div className="vault_img">
                <Vaultimg01></Vaultimg01>
              </div>
              <div className="nametxt">
                <span className="vaultname">Stable Defi Fund</span>
                <span className="dacname">Quinoa quant</span>
              </div>
            </div>
            <div className="propensity">
              <span className="prop_agre">aggressive</span>
            </div>
          </div>
        </div> */}
    </div>
  );
};

export default Titledetailwrap;
