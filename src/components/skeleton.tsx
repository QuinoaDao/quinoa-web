import React from "react";
import "./skeleton.css";
export const Skeleton = () => {
  return (
    <div id="s_skeleton_wrap">
      <div className="s_infomain_wrap">
        <div className="s_detail_wrap">
          <div className="s_vaultTitle_wrap">
            <div className="s_vault_title">
              <div className="s_vault_img"></div>
              <div className="s_nametxt">
                <span className="s_vaultname"></span>
                <span className="s_dacname"></span>
              </div>
            </div>
          </div>
        </div>
        <div className="s_spacing_26px"></div>
        <div className="s_Intro_wrap">
          <span className="s_Introduction"></span>
          <span className="s_Intro_txt"></span>
          <span className="s_Intro_txt"></span>
          <span className="s_Intro_txt"></span>
          <div className="s_tag_wrap">
            <div className="s_tag">
              <span className="s_tag_name"></span>
            </div>
            <div className="s_tag">
              <span className="s_tag_name"></span>
            </div>
          </div>
          <div className="s_spacing_33px_underline"></div>
        </div>
        <div className="s_spacing_51px"></div>
        <div className="s_vault_priceinfo">
          <div className="s_aum">
            <span className="s_About_txt_short"></span>
            <span className="s_number_txt"></span>
          </div>
          <div className="s_aum">
            <span className="s_About_txt_short"></span>
            <span className="s_number_txt"></span>
          </div>
          <div className="s_aum">
            <span className="s_About_txt_short"></span>
            <span className="s_number_txt"></span>
          </div>
        </div>
        <div className="s_spacing_33px"></div>
        <div className="s_ut_wrap"></div>
        <div className="s_maintitle_wrap">
          <div className="s_spacing_100px"></div>
          <span className="s_maintitle_txt"></span>
          <div className="s_maintitleUnderline"></div>
        </div>
        <div className="s_performance_wrap"></div>
      </div>
      <div className="s_buysellBox_wrap">
        <div className="s_spacing_50px_line"></div>
        <div className="s_skeleton_box"></div>
        <div className="s_skeleton_box"></div>
        <div className="s_skeleton_box"></div>
      </div>
    </div>
  );
};
export default Skeleton;
