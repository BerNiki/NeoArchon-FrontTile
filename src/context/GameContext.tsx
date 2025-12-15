import { createContext, useContext } from "react";

const GameContext = createContext(null);

export const useGame = () => {
  const context = useContext(GameContext);

  if (!context) throw new Error("useGame needs to be within GameProvider.");

  return context;
};
