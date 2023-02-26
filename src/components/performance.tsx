const Performance = () => {
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
}

export default Performance;