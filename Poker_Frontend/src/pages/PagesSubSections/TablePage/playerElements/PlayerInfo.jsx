import React, { Component } from "react";
import { Space, Typography } from "antd";

export class PlayerInfo extends Component {
  render() {
    const { mainPlayer } = this.props;
    const { Text } = Typography;

    return (
      <Space className="min-w-48" direction="vertical">
        <Text className="text-xl font-semibold">{mainPlayer.name}</Text>
        <Text>
          Chip Bank: <span className="text-[#4d724d]">${mainPlayer.chips}</span>
        </Text>
        <Text>
          Round Bet: <span className="text-[#ca6161]">-${mainPlayer.bet}</span>
        </Text>
        <Text>
          Status:
          <span className="text-[#4d724d]">
            {mainPlayer.fold ? " Folded" : " Active"}
          </span>
        </Text>
        <Text>Current Best Hand: {mainPlayer.bestHand}</Text>
        <Text>Current Hand Rank: {mainPlayer.rank}</Text>
      </Space>
    );
  }
}

export default PlayerInfo;
