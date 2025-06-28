import React, { Component } from "react";
import Card from "../../../components/card";
import { Space, Typography } from "antd";

export class AllPlayersInfoUI extends Component {
  render() {
    const { playerInfo, gameState } = this.props;
    const { Text, Link } = Typography;
    return (
      <div className="h-1/5 flex pt-2 pb-2 justify-between ">
        <Space direction="vertical">
          <Text className="text-xl font-semibold">{playerInfo.name}</Text>
          <Text>
            Chip Bank:{" "}
            <span className="text-[#4d724d]">${playerInfo.chips}</span>
          </Text>
          <Text>
            Round Bet:{" "}
            <span className="text-[#ca6161]">-${playerInfo.bet}</span>
          </Text>
          <Text>
            <span className="text-[#4d724d]">
              {playerInfo.fold ? "Folded" : "Active"}
            </span>
          </Text>
        </Space>
        <div className=" w-3/5 h-full flex justify-evenly">
          {gameState.winner ? (
            <>
              <Card cardImage={playerInfo.hand[0]} />
              <Card cardImage={playerInfo.hand[1]} />
            </>
          ) : (
            <>
              <Card cardImage="back" />
              <Card cardImage="back" />
            </>
          )}
        </div>
      </div>
    );
  }
}

export default AllPlayersInfoUI;
