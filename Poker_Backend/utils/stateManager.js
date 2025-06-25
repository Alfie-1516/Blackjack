// gameState.js
export let gameState = {
  deck: [],
  players: [
    {
      id: 1,
      name: "Alice",
      hand: [],
      chips: 1500,
      bet: 10,
      timesPlayed: 5,
      fold: false,
      allIn: false,
      out: false,
    },
    {
      id: 2,
      name: "Bob",
      hand: [],
      chips: 1200,
      bet: 20,
      timesPlayed: 3,
      fold: false,
      allIn: false,
      out: false,
    },
    {
      id: 3,
      name: "Charlie",
      hand: [],
      chips: 800,
      bet: 0,
      timesPlayed: 7,
      fold: true,
      allIn: false,
      out: false,
    },
    {
      id: 4,
      name: "Diana",
      hand: [],
      chips: 2000,
      bet: 50,
      timesPlayed: 2,
      fold: false,
      allIn: true,
      out: false,
    },
    {
      id: 5,
      name: "Ethan",
      hand: [],
      chips: 500,
      bet: 0,
      timesPlayed: 10,
      fold: false,
      allIn: false,
      out: true,
    },
    {
      id: 6,
      name: "Fiona",
      hand: [],
      chips: 1750,
      bet: 30,
      timesPlayed: 4,
      fold: false,
      allIn: false,
      out: false,
    },
  ],
  pot: 0,
  playerTurn: 1,
  highestRoundBet: 0,
  previousAction: "No Moves Made",
  communityCards: [],
  round: "Pre-Flop",
  showFlop: false,
  showRiver: false,
  showTurn: false,
  gameOver: false,
  gameOver: true,
  winner: null,
};

export function getCurrentGameState() {
  return gameState;
}

export function setCurrentGameState(newState) {
  gameState = { ...gameState, ...newState }; // Merge updates
}

export function newGameState() {
  return {
    deck: [],
    players: [],
    pot: 0,
    playerTurn: 1,
    highestRoundBet: 0,
    previousAction: "Small blind has played a bet of $10",
    communityCards: [],
    round: "Pre-Flop",
    showFlop: false,
    showRiver: false,
    showTurn: false,
    gameOver: true,
    winner: null,
  };
}
