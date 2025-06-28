import React, { Component } from "react";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import MainButton from "./StartButton";

export default function Navbar({ setShowHowToPlay }) {
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
        <a href="/Table">
          <MainButton buttonName="Start Playing" />
        </a>
      </span>

      {/* section 3 */}
      <button
        className="basis-3/12 text-3xl flex justify-end items-center text-black "
        onClick={() => setShowHowToPlay(true)}
      >
        <HiOutlineInformationCircle />
      </button>
    </nav>
  );
}
