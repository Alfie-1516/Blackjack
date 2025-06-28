import React from "react";
import { Button } from "antd";

function GameButtons({ buttonName, setTempPlayers, amount, gameState }) {
  async function handleButtonPress(clickedButton) {
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
    <Button
      className="bg-[#4d724d] w-20 h-8 flex justify-center items-center rounded-3xl text-white"
      onClick={() => handleButtonPress(buttonName)}
    >
      {buttonName}
    </Button>
  );
}

export default GameButtons;
