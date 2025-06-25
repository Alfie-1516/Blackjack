import React, { Component } from "react";
import RPContent from "./PagesSubSections/RulesPage(RP)/RPContent";
import RPImageContainer from "./PagesSubSections/RulesPage(RP)/RPImageContainer";
import rules from "../../../Poker_Backend/data/rules.json";

export class Rules extends Component {
  render() {
    return (
      <div className="  p-4  h-[90vh] w-screen overflow-y-scroll snap-y snap-mandatory scroll-smooth">
        {/* Map through each rule and render its content and image */}
        {rules.map((rule, idx) => (
          <main
            key={idx}
            className=" h-[90vh] flex snap-start transition-all duration-500"
          >
            {/* Rule content section */}
            <RPContent {...rule} />
            {/* Rule image section */}
            <RPImageContainer />
          </main>
        ))}
      </div>
    );
  }
}

export default Rules;
