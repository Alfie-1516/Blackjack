import React, { Component } from "react";
import Card from "../../../components/card";

export function MainTable({ gameState }) {
  let table_cards = gameState.communityCards;
  let potValue = gameState.pot;
  return (
    <div className="p-6 h-[65%] border-2 rounded-tr-lg  border-l-0 border-[#8db48e] flex flex-col justify-center gap-3 items-center w-full bg-[url(/poker_table.webp)] bg-center lg:bg-size-[90%] :bg-size-[100%] bg-no-repeat">
      <p className="text-xl font-semibold text-white">
        Pot Amount : <span className="text-white">${potValue}</span>
      </p>
      <img src="/medium.jpg" alt="" className="w-30 h-30" />
      <div className="h-2/6 w-1/2 flex">
        {table_cards.map((card, idx) => (
          <Card key={idx} cardImage={card} />
        ))}
      </div>
    </div>
  );
}

export default MainTable;
