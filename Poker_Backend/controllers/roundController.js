import GameState from "../models/GameState.js";
import { generateDeck } from "../services/deckGenerator.js";
import { dealToPlayers } from "../utils/dealToPlayers.js";
import { resetPlayersForNextRound } from "../utils/resetPlayersForNextRound.js";

export const nextRound = async (req, res) => {
  try {
    let gameState = await GameState.findOne();

    if (!gameState) {
      return res
        .status(404)
        .json({ message: "No game state found in the database." });
    }

    const deck = generateDeck();
    gameState.deck = deck;
    gameState.players = dealToPlayers(gameState.players, deck);
    gameState.pot = 10;
    gameState.playerTurn = 2;
    gameState.highestRoundBet = 10;
    gameState.communityCards = [];
    gameState.round = "Pre-Flop";
    gameState.showFlop = false;
    gameState.showTurn = false;
    gameState.showRiver = false;
    gameState.gameOver = false;
    gameState.winner = null;
    gameState.players = resetPlayersForNextRound(gameState.players);

    const currentPlayer = gameState.players.find((player) => player.id === 1);
    currentPlayer.bestHand = "Unknown";
    currentPlayer.rank = "Unknown";
    currentPlayer.chips -= 10;
    currentPlayer.bet += 10;

    gameState.previousAction = "Player 1 posted small blind of $10";

    await gameState.save();

    res.status(200).json({
      message: "Game state reset for the next round.",
      state: gameState,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: "Error resetting game state for next round.",
      error: error.message,
    });
  }
};
