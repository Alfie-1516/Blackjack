import { roundVerifier } from "../utils/roundVerifier.js";
import { tableCardGenerator } from "./tableCardGenerator.js";
import { getWinner } from "../utils/getWinner.js";

export function gameManager(gameState, action, amount) {
  const currentPlayer = gameState.players.find(
    (player) => player.id === gameState.playerTurn
  );

  const currentRoundBet = gameState.highestRoundBet;
  if (currentPlayer && !currentPlayer.fold) {
    switch (action) {
      case "Raise":
        const newRaisedAmount = currentRoundBet + amount;
        currentPlayer.chips -= newRaisedAmount;
        currentPlayer.bet += newRaisedAmount;
        gameState.pot += newRaisedAmount;
        gameState.highestRoundBet = newRaisedAmount;
        currentPlayer.allPlays.push("Raise");
        break;
      case "Call":
        const requiredAmount = currentRoundBet - currentPlayer.bet;
        currentPlayer.chips -= requiredAmount;
        currentPlayer.bet += requiredAmount;
        gameState.pot += requiredAmount;
        currentPlayer.allPlays.push("call");
        break;
      case "Check":
        currentPlayer.allPlays.push("check");
        break;
      case "All In":
        currentPlayer.allIn = true;
        gameState.pot += currentPlayer.chips;
        currentPlayer.chips = 0;
        break;
      case "Fold":
        currentPlayer.fold = true;
        break;
    }
  } else {
    currentPlayer.allPlays.push("call");
  }

  let roundOver = roundVerifier(gameState);
  if (roundOver) {
    if (!gameState.showFlop) {
      gameState.communityCards.push(...tableCardGenerator(gameState.deck, 3));
      gameState.showFlop = true;
    } else if (!gameState.showTurn) {
      gameState.communityCards.push(...tableCardGenerator(gameState.deck, 1));
      gameState.showTurn = true;
    } else if (!gameState.showRiver) {
      gameState.communityCards.push(...tableCardGenerator(gameState.deck, 1));
      gameState.showRiver = true;
      getWinner(gameState.players, gameState.communityCards);
    } else if (
      gameState.showTurn &&
      gameState.showFlop &&
      gameState.showRiver
    ) {
      let gameWinner = getWinner(gameState.players, gameState.communityCards);
      gameState.winner = gameWinner;
      const winningPlayer = gameState.players.find(
        (player) => player.name === gameWinner.winner.name
      );
      if (winningPlayer) {
        winningPlayer.chips += gameState.pot;
      }
      gameState.gameOver = true;
    }
    gameState.players.forEach((player) => {
      player.allPlays = [];
      player.bet = 0;
    });
    gameState.highestRoundBet = 0;
    gameState.playerTurn = 0;
  }
  return gameState;
}
