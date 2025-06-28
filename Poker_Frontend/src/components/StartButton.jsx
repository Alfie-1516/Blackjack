import React from "react";
import getAIAction from "../components/AIplayer"; // Add missing import

export default function MainButton({ buttonName, setTempPlayers, gameState }) {
  async function handleButtonPress(clickedButton) {
    console.log(clickedButton);

    // Fix: Use proper OR condition
    if (clickedButton === "Start Game" || clickedButton === "Start Playing") {
      console.log("Player has started the game");

      try {
        const response = await fetch(
          "http://localhost:5001/api/game/startGame"
        );
        const data = await response.json();
        console.log(data.allPlayers);
        setTempPlayers(data.allPlayers);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      }
      return;
    }

    if (clickedButton === "Next Round") {
      console.log("Starting next round");

      try {
        const response = await fetch(
          "http://localhost:5001/api/game/nextRound"
        );
        const data = await response.json();
        console.log(data.allPlayers);
        setTempPlayers(data.allPlayers);
      } catch (error) {
        console.error("Failed to fetch players:", error);
      }
      return;
    }

    if (clickedButton === "Next Player") {
      console.log("In Next Player");
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

      console.log(player.name, action);
      try {
        const res = await fetch("http://localhost:5001/api/game/playerAction", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            action: action.action,
            // Include amount if it exists (though AI won't raise, it might be needed)
            ...(action.amount && { amount: action.amount }),
          }),
        });
        const result = await res.json();
        console.log("Action result:", result);
      } catch (error) {
        console.error("Failed to send action:", error);
      }
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
