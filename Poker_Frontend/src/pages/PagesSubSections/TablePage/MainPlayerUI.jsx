import React, { Component } from "react";
import Card from "../../../components/card";
import PlayerInfo from "./playerElements/PlayerInfo";
import PlayerCard from "./playerElements/PlayerCard";
import GameController from "./GameController";
import { Space, Typography } from "antd";

export function MainPlayerUI({ mainPlayer }) {
  return (
    <div className="h-full w-[70%]   flex justify-between ">
      <PlayerInfo mainPlayer={mainPlayer} />
      <Space className="flex min-w-40 w-4/6  h-full   pr-4">
        <PlayerCard cardImage={mainPlayer.hand[0]} />
        <PlayerCard cardImage={mainPlayer.hand[1]} />
      </Space>
    </div>
  );
}

export default MainPlayerUI;
