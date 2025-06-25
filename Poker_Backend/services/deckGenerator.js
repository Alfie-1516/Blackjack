import { shuffleDeck } from "../utils/deckShuffler.js";

export function generateDeck() {
  const faceCardMap = { J: "jack", Q: "queen", K: "king", A: "ace" };
  const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
  const values = [
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "10",
    "J",
    "Q",
    "K",
    "A",
  ];
  const deck = suits.flatMap((suit) =>
    values.map((value) => {
      const cardValue = faceCardMap[value] || value;
      return `${cardValue}_of_${suit.toLowerCase()}.svg`;
    })
  );
  return shuffleDeck(deck);
}
