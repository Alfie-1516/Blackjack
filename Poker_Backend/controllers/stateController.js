import { getCurrentGameState } from "../utils/stateManager.js";

export const gameState = (req, res) => {
  let state = getCurrentGameState();
  res.status(200).json({
    message: "retrivedMessage ",
    state: { state },
  });
};
