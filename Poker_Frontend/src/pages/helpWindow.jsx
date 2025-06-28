import React from "react";

export default function HelpWindow({ showHowToPlay, setShowHowToPlay }) {
  if (!showHowToPlay) return null;

  return (
    <div className="bg-white h-[400px] w-[300px] absolute m-auto inset-0 flex flex-col items-center justify-center rounded-lg shadow-lg z-50 border border-black p-4">
      <h2 className="text-xl font-bold text-black mb-4">How to Play</h2>
      <p className="text-center text-black text-sm mb-2">
        Click the <span className="font-semibold">Next Player</span> button to
        prompt the AI to play its turn.
      </p>
      <p className="text-center text-black text-sm mb-2">
        After the AI plays, its cards will appear at the bottom of the screen
        along with:
      </p>
      <ul className="text-black text-sm list-disc list-inside text-left mb-4">
        <li>Community cards in the center</li>
        <li>The AI’s chip count</li>
        <li>Card rank relative to the community</li>
      </ul>
      <p className="text-center text-black text-sm">
        Keep clicking <span className="font-semibold">Next Player</span> to
        continue rounds until a winner is determined.
      </p>

      <button
        onClick={() => setShowHowToPlay(false)}
        className="bg-[#4d724d] w-20 h-8 flex justify-center items-center rounded-3xl text-white mt-4"
      >
        Got it!
      </button>
    </div>
  );
}
