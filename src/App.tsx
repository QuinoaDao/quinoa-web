import React from "react";
import Landing from "./pages/Landing";
import Vaultdetail from "./pages/vaultdetail";
import Nav from "./components/nav";
import Footer from "./components/footer";
import "./App.css";

function App(): JSX.Element {
  return (
    <html className="App">
      <Nav></Nav>
      <Vaultdetail></Vaultdetail>
      <Footer></Footer>
    </html>
  );
}

export default App;
