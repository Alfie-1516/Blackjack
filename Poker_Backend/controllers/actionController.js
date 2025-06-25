import {
  getCurrentGameState,
  setCurrentGameState,
} from "../utils/stateManager.js";
import { turnManager } from "../utils/turnManager.js";
import { playSummarizer } from "../utils/playeSummarizer.js";
import { gameManager } from "../services/gameManager.js";

export const playerAction = (req, res) => {
  const { action, amount } = req.body;

  let currentState = getCurrentGameState();
  let currentPlayer = currentState.playerTurn;
  currentState.previousAction = playSummarizer(currentPlayer, action, amount);

  currentState = gameManager(currentState, action, amount);
  currentState.playerTurn = turnManager(currentState.playerTurn);
  setCurrentGameState(currentState);
  res.json({ message: `Received action: ${action}` });
};
