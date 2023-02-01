import React, { useState, useEffect } from "react";
import "./nav.css";
import { ReactComponent as Quinoalogo } from "../components/asset/quinoa_logo.svg";
function Nav() {
  const [scrollPosition, setScrollPosition] = useState(0);
  const updateScroll = () => {
    setScrollPosition(window.scrollY || document.documentElement.scrollTop);
  };
  useEffect(() => {
    window.addEventListener("scroll", updateScroll);
  });
  return (
    <header id={scrollPosition < 100 ? "og_header_wrap" : "og_header_wrap"}>
      <div className="header">
        <Quinoalogo className="logo"></Quinoalogo>
        <div className="wallet_btn">
          <span className="get_start">Get start</span>
        </div>
      </div>{" "}
    </header>
  );
}
// export const Nav = () => {
//   return (
//     <header id="header_wrap">
//       <div className="header">
//         <Quinoalogo className="logo"></Quinoalogo>
//         <div className="wallet_btn">
//           <span className="get_start">Get start</span>
//         </div>
//       </div>
//     </header>
//   );
// };
export default Nav;
