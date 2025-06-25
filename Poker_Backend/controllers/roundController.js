import { getCurrentGameState } from "../utils/stateManager.js";
import { generateDeck } from "../services/deckGenerator.js";
import { dealToPlayers } from "../utils/dealToPlayers.js";
import { setCurrentGameState, newGameState } from "../utils/stateManager.js";

export const nextRound = (req, res) => {
  let gameState = getCurrentGameState();
  const deck = generateDeck();
  gameState.deck = deck;
  gameState.players = dealToPlayers(gameState.players, deck);
  gameState.pot = 10;
  gameState.playerTurn = 2;
  gameState.highestRoundBet = 10;
  gameState.communityCards = [];
  gameState.round = "Pre-Flop";
  gameState.showFlop = false;
  gameState.showRiver = false;
  gameState.showTurn = false;
  gameState.gameOver = false;
  gameState.winner = null;
  const currentPlayer = gameState.players.find((player) => player.id === 1);
  currentPlayer.chips -= 10;
  currentPlayer.bet += 10;
  res.status(200).json({
    message: "retrivedMessage ",
    state: { gameStatestate },
  });
};
