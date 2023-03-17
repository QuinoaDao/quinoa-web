export const About = () => {
  return (
    <>
        <div className="maintitle_wrap">
          <div className="spacing_100px"></div>
          <span className="maintitle_txt">About</span>
          <div className="maintitleUnderline"></div>
        </div>
        <div className="spacing_28px"></div>
        <div className="about_list">
          <div className="creator_wrap al_wrap">
            <span className="name">QuinoaDAC</span>
            <span className="txt">Creator</span>
          </div>
          <div className="inceptiondate_wrap al_wrap">
            <span className="name">2 24, 2023</span>
            <span className="txt">Inception Date</span>
          </div>
          <div className="network_wrap al_wrap">
            <span className="name">on {process.env.REACT_APP_NETWORK_NAME}</span>
            <span className="txt">Network</span>
          </div>
          <div className="contract_wrap al_wrap">
            <a href={"https://polygonscan.com/address/" + process.env.REACT_APP_PRODUCT_ADDRESS} target="_blank">
              <span className="name">View Contract</span>
            </a>
            <span className="txt">Contract Link</span>
          </div>
        </div>
    </>
  );
};
export default About;
