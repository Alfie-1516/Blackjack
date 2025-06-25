import { generateDeck } from "../services/deckGenerator.js";
import { createPlayers } from "../services/playerGenerator.js";
import { setCurrentGameState, newGameState } from "../utils/stateManager.js";

export const startGame = (req, res) => {
  const deck = generateDeck();
  const players = createPlayers(deck);
  let gameState = newGameState();
  gameState.players = players;
  gameState.deck = deck;
  gameState.gameOver = false;
  gameState.pot = 10;
  gameState.playerTurn = 2;
  gameState.highestRoundBet = 10;
  const currentPlayer = gameState.players.find((player) => player.id === 1);
  currentPlayer.chips -= 10;
  currentPlayer.bet += 10;
  setCurrentGameState(gameState);
  res.status(200).json({
    message: "Game started",
    allPlayers: players,
  });
};
