import React, { Component } from "react";

export class CustomFooter extends Component {
  render() {
    // font-family: "Lobster", cursive;
    // font-size: 10px;
    // text-align: start;
    // margin: 10px 0;
    // padding-left: 5%;
    return (
      <footer className="pl-4 h-[3vh]">
        <p className="text-xs italic">© 2025 TeachWise BlackJack</p>
      </footer>
    );
  }
}

export default CustomFooter;
