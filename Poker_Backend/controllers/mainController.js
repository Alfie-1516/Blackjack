import { generateDeck } from "../services/deckGenerator.js";
import { createPlayers } from "../services/playerGenerator.js";
import GameState from "../models/GameState.js";

export const startGame = async (req, res) => {
  try {
    const deck = generateDeck();
    const players = createPlayers(deck);

    const gameStateData = {
      deck,
      players,
      pot: 10,
      playerTurn: 2,
      highestRoundBet: 10,
      previousAction: "",
      communityCards: [],
      round: "Pre-Flop",
      showFlop: false,
      showTurn: false,
      showRiver: false,
      gameOver: false,
      winner: null,
    };

    const currentPlayer = gameStateData.players.find((p) => p.id === 1);
    currentPlayer.chips -= 10;
    currentPlayer.bet += 10;
    gameStateData.previousAction = "Player 1 posted small blind of $10";

    // Reset previous game state and save new one
    await GameState.deleteMany({});
    const newGame = new GameState(gameStateData);
    await newGame.save();

    res.status(200).json({
      message: "Game started",
      gameState: newGame,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to start game" });
  }
};
