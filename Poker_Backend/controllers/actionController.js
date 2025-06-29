import GameState from "../models/GameState.js";
import { turnManager } from "../utils/turnManager.js";
import { playSummarizer } from "../utils/playSummarizer.js";
import { gameManager } from "../services/gameManager.js";

export const playerAction = async (req, res) => {
  const { action, amount } = req.body;

  try {
    let currentState = await GameState.findOne();

    if (!currentState) {
      return res
        .status(404)
        .json({ message: "No game state found in the database." });
    }

    const currentPlayer = currentState.playerTurn;

    // Update previous action summary
    currentState.previousAction = playSummarizer(currentPlayer, action, amount);

    // Process the game logic based on the action
    const updatedState = gameManager(currentState.toObject(), action, amount);

    // Update turn
    updatedState.playerTurn = turnManager(currentPlayer, updatedState);

    // Replace fields in Mongoose document
    Object.assign(currentState, updatedState);

    // Save updated state
    await currentState.save();

    res.json({
      message: `Action '${action}' processed for Player ${currentPlayer}`,
      state: currentState,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error processing player action.",
      error: error.message,
    });
  }
};
