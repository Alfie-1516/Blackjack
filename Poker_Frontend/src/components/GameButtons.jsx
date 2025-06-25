import React from "react";

function GameButtons({ buttonName, setTempPlayers, amount }) {
  async function handleButtonPress(clickedButton) {
    if (clickedButton === "Start Game") {
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
      console.log("Player has started the game");

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

    // For all other buttons, send the button name to the backend
    try {
      const res = await fetch("http://localhost:5001/api/game/playerAction", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ action: clickedButton, amount: amount }),
      });
      const result = await res.json();
      // Optionally update state here if needed
    } catch (error) {
      console.error("Failed to send action:", error);
    }
  }

  return (
    <button
      onClick={() => handleButtonPress(buttonName)}
      className="bg-[#4d724d] w-20 h-8 flex justify-center items-center rounded-3xl text-white"
    >
      {buttonName}
    </button>
  );
}

export default GameButtons;
