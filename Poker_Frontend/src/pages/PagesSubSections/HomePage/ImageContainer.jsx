import React, { Component } from "react";
import PokerLamp from "../../../assets/PokerLamp.png";

export class ImageContainer extends Component {
  render() {
    return (
      // Main container for the right side image on the Home page
      <div className="w-1/2 h-full ">
        {/* Poker lamp image */}
        <img
          src={PokerLamp}
          alt="Poker Lamp"
          className="max-h-full max-w-full"
        />
      </div>
    );
  }
}

export default ImageContainer;
