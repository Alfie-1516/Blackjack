import React, { Component, useEffect, useState } from "react";
import MainPlayerUI from "./PagesSubSections/TablePage/mainPlayerUI";
import MainTable from "./PagesSubSections/TablePage/MainTable";
import AllPlayersUI from "./PagesSubSections/TablePage/allPlayersUI";
import GameController from "./PagesSubSections/TablePage/GameController";
import GameButtons from "../components/GameButtons";

export function Table() {
  const [players, setTempPlayers] = useState([
    {
      id: 1,
      name: "Alice",
      hand: [],
      chips: 1500,
      bet: 10,
      timesPlayed: 5,
      fold: false,
      allIn: false,
      out: false,
    },
    {
      id: 2,
      name: "Bob",
      hand: [],
      chips: 1200,
      bet: 20,
      timesPlayed: 3,
      fold: false,
      allIn: false,
      out: false,
    },
    {
      id: 3,
      name: "Charlie",
      hand: [],
      chips: 800,
      bet: 0,
      timesPlayed: 7,
      fold: true,
      allIn: false,
      out: false,
    },
    {
      id: 4,
      name: "Diana",
      hand: [],
      chips: 2000,
      bet: 50,
      timesPlayed: 2,
      fold: false,
      allIn: true,
      out: false,
    },
    {
      id: 5,
      name: "Ethan",
      hand: [],
      chips: 500,
      bet: 0,
      timesPlayed: 10,
      fold: false,
      allIn: false,
      out: true,
    },
    {
      id: 6,
      name: "Fiona",
      hand: [],
      chips: 1750,
      bet: 30,
      timesPlayed: 4,
      fold: false,
      allIn: false,
      out: false,
    },
  ]);
  const [gameState, setGameState] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchState() {
      const response = await fetch("http://localhost:5001/api/game/gameState");
      const data = await response.json();
      setGameState(data.state.state);
      setLoading(false);
    }
    fetchState();
  }, [gameState]);

  if (loading) {
    return <div>Loading...</div>; // or null
  } else {
    const otherPlayers = gameState.players.slice(1, 6);
    return (
      <div className="p-4  h-[90vh] w-screen ">
        <main className=" h-full w-full flex ">
          <AllPlayersUI players={otherPlayers} />
          <div className="w-3/4 h-full ">
            <MainTable gameState={gameState} />
            <div className="flex h-[35%] border-2 border-t-0 border-l-0 rounded-br-lg p-4 border-[#8db48e]">
              <MainPlayerUI mainPlayer={gameState.players[0]} />
              <GameController
                setTempPlayers={setTempPlayers}
                gameState={gameState}
              />
            </div>
          </div>
        </main>
        {gameState.gameOver && (
          <div className="bg-red-300 h-[500px] w-[500px] absolute m-auto inset-0">
            <p>{gameState.winner}</p>
            <GameButtons
              buttonName={"Start Game"}
              setTempPlayers={setTempPlayers}
            />
            <GameButtons
              buttonName={"Next Round"}
              setTempPlayers={setTempPlayers}
            />
          </div>
        )}
      </div>
    );
  }
}

export default Table;
