import React, { useState } from "react";

import api from "./api";

import "./App.css";
import "./stylesheets/colors.css";
import "./stylesheets/button.css";

import AppConnected from "./components/AppConnected";
import AppDisconnected from "./components/AppDisconnected";

const App = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [data, setData] = useState(null);
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);
  const [isDisconnected, setIsDisconnected] = useState(true);

  const fetchData = () => {
    setIsLoading(true);
    setTimeout(async () => {
      const response = await api();
      const user = response[0];
      const game = response[1];

      setData({ user, game });
    }, 2000);
    setIsDisconnected(false);
  };

  return (
    <div id="App" className="App">
      <div className="rainbow-top" />
      {data ? (
        <AppConnected
          data={data}
          message={message}
          setMessage={setMessage}
          showMessage={showMessage}
          setShowMessage={setShowMessage}
          isDisconnected={isDisconnected}
          setIsDisconnected={setIsDisconnected}
        />
      ) : (
        <AppDisconnected
          fetchData={fetchData}
          isLoading={isLoading}
          isDisconnected={isDisconnected}
        />
      )}
    </div>
  );
};

export default App;
