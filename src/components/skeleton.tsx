import React from "react";
import "./skeleton.css";
export const Skeleton = () => {
  return (
    <div id="skeleton_wrap">
      <div className="infomain_wrap">
        <div className="detail_wrap">
          <div className="vaultTitle_wrap">
            <div className="vault_title">
              <div className="vault_img"></div>
              <div className="nametxt">
                <span className="vaultname"></span>
                <span className="dacname"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="spacing_26px"></div>
        <div className="Intro_wrap">
          <span className="Introduction"></span>
          <span className="Intro_txt"></span>
          <span className="Intro_txt"></span>
          <span className="Intro_txt"></span>
          <div className="tag_wrap">
            <div className="tag">
              <span className="tag_name"></span>
            </div>
            <div className="tag">
              <span className="tag_name"></span>
            </div>
          </div>
          <div className="spacing_33px_underline"></div>
        </div>
        <div className="spacing_51px"></div>
        <div className="vault_priceinfo">
          <div className="aum">
            <span className="About_txt_short"></span>
            <span className="number_txt"></span>
          </div>
          <div className="aum">
            <span className="About_txt_short"></span>
            <span className="number_txt"></span>
          </div>
          <div className="aum">
            <span className="About_txt_short"></span>
            <span className="number_txt"></span>
          </div>
        </div>
        <div className="spacing_33px"></div>
        <div className="ut_wrap"></div>
        <div className="maintitle_wrap">
          <div className="spacing_100px"></div>
          <span className="maintitle_txt"></span>
          <div className="maintitleUnderline"></div>
        </div>
        <div className="performance_wrap"></div>
      </div>
      <div className="buysellBox_wrap">
        <div className="spacing_50px_line"></div>
        <div className="skeleton_box"></div>
        <div className="skeleton_box"></div>
        <div className="skeleton_box"></div>
      </div>
    </div>
  );
};
export default Skeleton;
