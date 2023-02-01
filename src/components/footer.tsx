import React from "react";
import "./footer.css";

export const Footer = () => {
  return (
    <footer className="footer_wrap">
      <div className="footer">
        <div className="footer_txt">
          <span className="Copyright">
            Copyright 2023 Quinoa team. All Rights Reserved.
          </span>
          <span className="tvl">Total Volume $ 3,928,081</span>
        </div>
      </div>
    </footer>
  );
};
export default Footer;
