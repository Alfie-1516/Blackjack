import { dealCard } from "../utils/dealCard.js";

export function tableCardGenerator(deck, number) {
  let tableCards = [];
  for (let i = 0; i < number; i++) {
    tableCards.push(dealCard(deck));
  }
  return tableCards;
}
