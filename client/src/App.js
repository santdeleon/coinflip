import React, { useState, useEffect } from "react";

import api from "./api";

import "./App.css";

import Layout from "./components/Layout";
import Loader from "./components/Loader";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState({});
  const [message, setMessage] = useState("");
  const [showMessage, setShowMessage] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const response = await api();
      const user = response[0];
      const game = response[1];

      setData({ user, game });
      setIsLoading(false);
    };

    fetchData();
  }, []);

  if (isLoading) return <Loader />;

  return (
    <div className="App" data-testid="App">
      <div className="rainbow-top" />
      <Layout
        user={data.user}
        game={data.game}
        message={message}
        setMessage={setMessage}
        showMessage={showMessage}
        setShowMessage={setShowMessage}
      />
    </div>
  );
};

export default App;
