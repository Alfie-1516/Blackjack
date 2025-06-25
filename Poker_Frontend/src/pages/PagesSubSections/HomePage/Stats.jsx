import React, { Component } from "react";

export class Stats extends Component {
  render() {
    // Destructure props for stat number and label
    const { statNumber, statLabel } = this.props;
    return (
      // Container for a single stat item
      <div>
        {/* Stat number with highlight */}
        <p className="text-3xl font-black">
          {statNumber} <span class="text-[#8db48e]">+</span>
        </p>
        {/* Stat label */}
        <p className="text-gray-500 font-extralight">{statLabel}</p>
      </div>
    );
  }
}

export default Stats;
