import React, { Component, useState } from "react";
import GameButtons from "../../../components/GameButtons";

export function GameController({ setTempPlayers, temp_players, gameState }) {
  const [betAmount, setBetAmount] = useState(0);
  return (
    <div className="w-1/2 h-full flex flex-col justify-evenly ">
      <p className="text-xl font-semibold">Previous Plays</p>
      <p>{gameState.previousAction} </p>
      <p className="text-xl font-semibold">Place bet</p>
      <p>How much would you like to bet</p>
      <div className="flex justify-between">
        <input
          className="border rounded-lg"
          type="text"
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
        />
        <GameButtons buttonName={"Raise"} amount={betAmount} />
        <GameButtons buttonName={"Call"} />
        <GameButtons buttonName={"Check"} />
      </div>
      <div className="flex gap-5">
        <GameButtons buttonName={"Fold"} />
        <GameButtons buttonName={"All In"} />
        <GameButtons
          buttonName={"Start Game"}
          setTempPlayers={setTempPlayers}
          temp_players={temp_players}
        />
      </div>
    </div>
  );
}

export default GameController;
