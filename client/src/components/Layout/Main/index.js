import React from "react";
import { string } from "prop-types";

import Interface from "./Interface";

const propTypes = {
  owner: string.isRequired,
  user: string.isRequired,
};

const defaultProps = {
  owner: "",
  user: "",
};

const Main = ({ owner, user }) => (
  <>
    <Interface owner={owner} user={user} />
  </>
);

Main.defaultProps = propTypes;
Main.defaultProps = defaultProps;
export default Main;
