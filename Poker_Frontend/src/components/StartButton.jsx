import React from "react";
import getAIAction from "../components/AIplayer"; // Add missing import
import {
  startNextRound,
  getAllPlayers,
  startNewGame,
  handlePlayerAction,
} from "../utils/api";

export default function MainButton({ buttonName, setTempPlayers, gameState }) {
  async function handleButtonPress(clickedButton) {
    // Fix: Use proper OR condition
    if (clickedButton === "New Game") {
      await setTempPlayers(startNewGame);
      return;
    }
    if (clickedButton === "Start Playing") {
      await setTempPlayers(getAllPlayers);
      return;
    }

    if (clickedButton === "Next Round") {
      await setTempPlayers(startNextRound);
      return;
    }

    if (clickedButton === "Next Player") {
      const player =
        gameState && gameState.players
          ? gameState.players[gameState.playerTurn - 1]
          : null;

      // Check if player exists
      if (!player) {
        console.error("No player found for current turn");
        return;
      }

      const action = getAIAction(
        parseInt(player.chips, 10),
        parseInt(player.bet, 10),
        parseInt(gameState.highestRoundBet, 10)
      );

      handlePlayerAction(action.action, action.amount);

      return;
    }
  }

  return (
    <button
      onClick={() => handleButtonPress(buttonName)}
      className="bg-[#4d724d] w-32 h-8 flex justify-center items-center rounded-3xl text-white px-2"
    >
      {buttonName}
    </button>
  );
}
