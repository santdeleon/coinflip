import React from "react";
import { toBeInTheDocument } from "@testing-library/jest-dom";
import { screen, render } from "@testing-library/react";

import getWeb3 from "./components/getWeb3";
import Loader from "./components/Loader";
import App from "./App";

it("show loading screen while retrieving data from the blockchain and then render <App /> ", async () => {
  // show loader
  render(<Loader />);
  expect(screen.queryByTestId("Loader")).toBeInTheDocument();

  // ping the blockchain
  await getWeb3();

  // render <App />
  render(<App />);
  expect(screen.queryByTestId("App")).toBeInTheDocument();
});
