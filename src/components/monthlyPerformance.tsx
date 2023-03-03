const MonthlyPerformance = ({monthDate, vaultPosition, venchPercent}: any) => {

    return (
        <div className="before_nm">
          <div className="circle_wrap">
            <div className="vaultCircle" style={{top: vaultPosition + "%"}}></div>
            <div className="benchCircle" style={{top: venchPercent + "%"}}></div>
          </div>
          <span className="bm_txt">{monthDate}</span>
        </div>
        
    )
}

export default MonthlyPerformance;