import { roundNumbers } from "../utils/MathUtils";

export const Stat = ({productInfoTvl}: any) => {

  return (
    <>
        <div className="maintitle_wrap">
          <div className="spacing_100px"></div>
          <span className="maintitle_txt">Stat</span>
          <div className="maintitleUnderline"></div>
        </div>
        <div className="spacing_28px"></div>
        <div className="stat_list">
          <div className="aum_wrap st_wrap">
            {productInfoTvl === undefined ? (
              <div className="s_name"></div>
            ) : (
              <span className="name">${roundNumbers(productInfoTvl)}</span>
            )}
            <span className="txt">AUM(TVL)</span>
          </div>
          <div className="propensity_wrap st_wrap">
              <span className="name">Moderate</span>
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
    </>
  );
};

export default Stat;
