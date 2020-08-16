import React from "react";

import NavMenu from "./NavMenu";
import Main from "./Main";
import Alert from "./Alert";
import ConnectWalletModal from "./ConnectWalletModal";

const Layout = () => (
  <>
    <Alert />
    <NavMenu />
    <ConnectWalletModal />
    <Main />
  </>
);

export default Layout;
