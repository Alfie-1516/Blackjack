import { dealCard } from "../utils/dealCard.js";
export function dealToPlayers(players, deck) {
  players.forEach((player) => {
    player.hand = [];
  });
  for (let i = 0; i < 2; i++) {
    players.forEach((player) => player.hand.push(dealCard(deck)));
  }
  return players;
}
