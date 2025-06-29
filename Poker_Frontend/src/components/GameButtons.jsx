import React from "react";
import { Button } from "antd";
import { handlePlayerAction } from "../utils/api";

function GameButtons({ buttonName, setTempPlayers, amount, gameState }) {
  async function handleButtonPress(clickedButton) {
    // For all other buttons, send the button name to the backend
    handlePlayerAction(clickedButton, amount);
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
