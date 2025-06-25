import React, { Component } from "react";
import StartButton from "../../../components/StartButton";
import Stats from "./Stats";

export class Content extends Component {
  render() {
    const allStat = [
      { statNumber: 1200, statLabel: "Snack Bluffs" },
      { statNumber: 800, statLabel: "Flush Fails" },
      { statNumber: 3000, statLabel: "Chip Spills" },
    ];
    return (
      // Main content container for the left side of the Home page
      <div className="w-1/2 h-full  flex flex-col justify-center gap-20">
        {/* Title and description section */}
        <div className="flex flex-col justify-center gap-7">
          <h1 className="text-7xl">
            <span class="text-[#8db48e]"> Poker Face:</span> Lose Chips, Win
            Glory
          </h1>
          <p class="font-extralight text-lg mt- text-gray-500">
            Looking for a poker table to call home? We’ve got a seat with your
            name on it <br /> —chips included!
          </p>
        </div>
        {/* Start button section */}
        <StartButton />
        {/* Stats display section */}
        <span className="flex w-full gap-7">
          {allStat.map((stat) => (
            <Stats
              key={stat.statNumber}
              statNumber={stat.statNumber}
              statLabel={stat.statLabel}
            />
          ))}
        </span>
      </div>
    );
  }
}

export default Content;
