import React, { Component } from "react";
import AllPlayersInfoUI from "./AllPlayersInfoUI";

export function AllPlayersUI({ players }) {
  return (
    <div className="w-3/12 h-full rounded-tl-lg rounded-bl-lg border-2 border-[#8db48e] pl-4 pr-4">
      {players.map((player, idx) => (
        <AllPlayersInfoUI key={idx} playerInfo={player} />
      ))}
    </div>
  );
}

export default AllPlayersUI;
