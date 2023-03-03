import MonthlyPerformance from "./monthlyPerformance";
import PerformanceHistory from "../utils/PerformanceHistory.json";

const Performance = () => {

  const calcPosition = (historyPercent: number) => {
    return (historyPercent - PerformanceHistory.percentPoint[0]) * 100 / (PerformanceHistory.percentPoint[4] - PerformanceHistory.percentPoint[0]);
  }

  return (
    <>
      <div className="maintitle_wrap">
        <div className="spacing_100px"></div>
        <span className="maintitle_txt">Performance</span>
        <div className="maintitleUnderline"></div>
      </div>
      <div className="performance_wrap">
        <div className="performance">
          <div className="percentChange_row">
            {
              PerformanceHistory.percentPoint.slice(0).reverse().map((cur: number, idx) => {
                return <span key={idx}>{cur}%</span>
              })
            }
          </div>
          <div className="performance_monthly">
            {
              PerformanceHistory.history.slice(PerformanceHistory.history.length-7,PerformanceHistory.history.length).map((cur, idx) => {
                return <MonthlyPerformance key={idx} monthDate={cur.date} vaultPosition={calcPosition(cur.vaultPercent)} venchPercent={calcPosition(cur.benchPercent)}/> 
              })
            }

          </div>
        </div>
        <div className="performancesort_wrap">
          <div className="spacing_64px"></div>
          <div className="performance_sort">
            <div className="vault_per_info">
              <div className="vp_icon"></div>
              <span className="vp_txt">Static allocation Product</span>
            </div>
            <div className="benchmark_per_info">
              <div className="bm_icon"></div>
              <span className="bm_txt">Benchmark</span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Performance;
