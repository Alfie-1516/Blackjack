import React, { Component } from "react";
import Card from "../../../components/card";
import PlayerInfo from "./playerElements/PlayerInfo";
import PlayerCard from "./playerElements/PlayerCard";
import GameController from "./GameController";

export function MainPlayerUI({ mainPlayer }) {
  return (
    <div className="h-full w-[70%]   flex justify-between ">
      <PlayerInfo mainPlayer={mainPlayer} />
      <div className="flex w-4/6  h-full justify-evenly gap-5 pr-4">
        <PlayerCard cardImage={mainPlayer.hand[0]} />
        <PlayerCard cardImage={mainPlayer.hand[1]} />
      </div>
    </div>
  );
}

export default MainPlayerUI;
