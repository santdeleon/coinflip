import React, { useContext } from "react";

const initialState = {
  isDisconnected: false,
  setIsDisconnected: () => {},

  message: "",
  showMessage: false,
  setShowMessage: () => {},

  tabs: [
    { id: 0, name: "Play" },
    { id: 1, name: "Results" },
    { id: 2, name: "Rules" },
    { id: 3, name: "Withdraw" },
  ],
};

const GameContext = React.createContext(initialState);

export const GameProvider = GameContext.Provider;
export const GameConsumer = GameContext.Consumer;
export const useGame = () => useContext(GameContext);
