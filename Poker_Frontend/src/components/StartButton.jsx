import React, { Component } from "react";

export class StartButton extends Component {
  render() {
    return (
      <button className="bg-[#4d724d] w-36 h-10 flex justify-center items-center rounded-3xl text-white">
        <a href="/Table">Start Playing</a>
      </button>
    );
  }
}

export default StartButton;
