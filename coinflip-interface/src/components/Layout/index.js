import React from "react";

import NavMenu from "./NavMenu";
import Main from "./Main";
import Alert from "./Alert";
import ConnectWalletModal from "./ConnectWalletModal";
// import Footer from "./Footer";

const Layout = () => (
  <>
    <Alert />
    <NavMenu />
    <Main />
    <ConnectWalletModal />
    {/* <Footer /> */}
  </>
);

export default Layout;
