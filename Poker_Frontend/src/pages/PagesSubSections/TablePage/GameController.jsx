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
      {gameState.winner ? (
        <p>Winner Found</p>
      ) : (
        <div>
          <p className="text-xl font-semibold">Place bet</p>
          <p>How much would you like to bet?</p>
          <div className="flex justify-between items-center gap-2 mt-2">
            <input
              className="border rounded-lg p-2 min-w-24 w-1/2"
              type="number"
              value={betAmount}
              onChange={(e) => setBetAmount(Number(e.target.value))}
            />
            {gameState.playerTurn === 1 ? (
              <>
                <GameButtons
                  buttonName="Raise"
                  amount={betAmount}
                  gameState={gameState}
                />
                <GameButtons buttonName="Call" gameState={gameState} />
                <GameButtons buttonName="Check" gameState={gameState} />
              </>
            ) : (
              <p className="text-[#4d724d]">
                Player {gameState.playerTurn}'s turn to play
              </p>
            )}
          </div>

          {gameState.playerTurn === 1 ? (
            <div className="flex gap-5 justify-end mt-3">
              <GameButtons buttonName="Fold" gameState={gameState} />
            </div>
          ) : (
            <div className="flex gap-5 justify-start mt-3">
              <MainButton buttonName="Next Player" gameState={gameState} />
            </div>
          )}
        </div>
      )}
    </Space>
  );
}

export default GameController;
