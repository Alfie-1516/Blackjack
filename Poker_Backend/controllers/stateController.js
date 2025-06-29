import GameState from "../models/GameState.js";

export const gameState = async (req, res) => {
  try {
    const state = await GameState.findOne();

    if (!state) {
      return res.status(404).json({
        message: "No game state found in the database",
      });
    }

    res.status(200).json({
      message: "Game state retrieved successfully",
      state,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error retrieving game state from database",
      error: error.message,
    });
  }
};
