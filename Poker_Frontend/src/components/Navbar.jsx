import React, { Component } from "react";
import { FaRegCircleUser } from "react-icons/fa6";
import StartButton from "./StartButton";

export class Navbar extends Component {
  render() {
    const links = [
      { href: "/Home", label: "Home" },
      { href: "/Rules", label: "Rules" },
    ];
    return (
      <nav className="p-4 text-white flex justify-between h-[7vh]">
        {/* Section 1 */}
        <div className="flex justify-start items-center basis-3/12">
          <h1 className=" text-3xl text-black">Poker</h1>
        </div>

        {/* section 2 */}
        <span className="basis-1/2 flex justify-center items-center gap-7 ">
          {links.map((link) => (
            <a key={link.href} href={link.href} className="text-black">
              {link.label}
            </a>
          ))}
          <StartButton />
        </span>

        {/* section 3 */}
        <button className="basis-3/12 text-3xl flex justify-end items-center text-black">
          <FaRegCircleUser />
        </button>
      </nav>
    );
  }
}

export default Navbar;
