import React, { Component, useState } from "react";
import GameButtons from "../../../components/GameButtons";
import MainButton from "../../../components/StartButton";
import { Space, Typography } from "antd";

export function GameController({ gameState }) {
  const [betAmount, setBetAmount] = useState(0);
  const { Text } = Typography;
  return (
    <Space direction="vertical" className="w-3/6">
      <div className="flex justify-between gap-2">
        <Text className="text-xl font-semibold">Previous Plays</Text>
        {gameState.playerTurn === 1 && (
          <Text className=" text-green-600">
            <span className="text-[#4d724d]">Your Turn</span>
          </Text>
        )}
      </div>

      <Text>{gameState.previousAction} </Text>
      <Text className="text-xl font-semibold">Place bet</Text>
      <Text>How much would you like to bet</Text>
      <div className="flex justify-between">
        <input
          className="border rounded-lg"
          type="text"
          value={betAmount}
          onChange={(e) => setBetAmount(Number(e.target.value))}
        />
        {gameState.playerTurn === 1 ? (
          <>
            <GameButtons
              buttonName={"Raise"}
              amount={betAmount}
              gameState={gameState}
            />
            <GameButtons buttonName={"Call"} gameState={gameState} />
            <GameButtons buttonName={"Check"} gameState={gameState} />
          </>
        ) : (
          <Text>
            <span className="text-[#4d724d]">
              Player {gameState.playerTurn}'s turn to play
            </span>
          </Text>
        )}
      </div>

      <div className="flex gap-5 justify-between">
        {gameState.playerTurn === 1 ? (
          <GameButtons buttonName={"Fold"} gameState={gameState} />
        ) : (
          <MainButton buttonName={"Next Player"} gameState={gameState} />
        )}

        {/* <GameButtons buttonName={"All In"} gameState={gameState} /> */}
      </div>
    </Space>
  );
}

export default GameController;
