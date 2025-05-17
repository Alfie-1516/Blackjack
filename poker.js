let bankRoll = 0;
let pot = 0;
let player_turn = false;
const betButton = document.getElementById("bet_button");
const betAmountInput = document.getElementById("bet_amount");
const currentBankRoll = document.getElementById("bet_roll");

// Event listener for the bet button
betButton.addEventListener("click", () => {
  const userInput = parseFloat(betAmountInput.value); // Dynamically get the input value

  if (!isNaN(userInput) && userInput > 0) {
    setBankRoll(userInput);
    currentBankRoll.textContent = `Bank Roll: $${getBankRoll()}`;
  } else {
    currentBankRoll.textContent = "Please enter a valid bet amount.";
  }
});
function timeToBet() {
  player_turn = !player_turn;
  const betModal = document.getElementById("bet_modal");
  if (player_turn === true) {
    betModal.style.display = "block";
  } else {
    betModal.style.display = "none";
  }
}
function start_game() {
  const deck = create_deck();
  const shuffledDeck = shuffle_deck(deck);
  const players = create_players();

  dealToPlayers(shuffledDeck, players);
  startBettingRound("pre-flop", players);
  getSetPlayerCards(players[1]); // Display player 1's cards
  getSetPlayerCards(players[0]); // Display player 1's cards
  const flop = dealFlop(shuffledDeck);
  setFlopCards(flop); // Display flop cards
}

// Function to set the bank roll
function setBankRoll(value) {
  bankRoll = value;
}

// Function to get the bank roll
function getBankRoll() {
  return bankRoll;
}

function make_wager(value) {
  const betAmount = document.getElementById("raise_amount").value;
  switch (value) {
    case "Raise":
      console.log(`Raise bet: ${betAmount}`);
      // Add logic for raising the bet
      break;
    case "Call":
      console.log(`Call bet: ${betAmount}`);
      // Add logic for calling the bet
      break;
    case "Check":
      console.log("Check action triggered");
      // Add logic for checking
      break;
    default:
      console.error("Unknown action:", value);
  }
}

function create_deck() {
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
  const deck = [];

  for (const suit of suits) {
    for (const value of values) {
      deck.push({ suit, value });
    }
  }

  return deck;
}
function shuffle_deck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}
function deal_card(deck) {
  return deck.pop();
}
function create_players() {
  const player1 = {
    id: 1,
    name: "Player 1",
    hand: [],
    chips: 1000,
    bet: 0,
  };
  const player2 = {
    id: 2,
    name: "Player 2",
    hand: [],
    chips: 1000,
    bet: 0,
  };
  const player3 = {
    id: 3,
    name: "Player 3",
    hand: [],
    chips: 1000,
    bet: 0,
  };
  return [player1, player2, player3];
}
function dealToPlayers(deck, players) {
  for (let i = 0; i < 2; i++) {
    for (const player of players) {
      const card = deal_card(deck);
      player.hand.push(card);
    }
  }
}
function dealFlop(deck) {
  const flop = [];
  for (let i = 0; i < 3; i++) {
    const card = deal_card(deck);
    flop.push(card);
  }
  return flop;
}
function dealTurn(deck) {
  const turn = deal_card(deck);
  return turn;
}
function dealRiver(deck) {
  const river = deal_card(deck);
  return river;
}
function startBettingRound(betting_state, players) {
  switch (betting_state) {
    case "pre-flop":
      const agreedSmallBlind = 10;
      const raise_amount = 20;
      pot = 0;

      // Small Blind - Player 1
      players[0].chips -= agreedSmallBlind;
      players[0].bet += agreedSmallBlind;
      pot += agreedSmallBlind;
      console.log(
        `${players[0].name} posts small blind of ${agreedSmallBlind}`
      );

      // Big Blind - Player 2
      const bigBlindTotal = agreedSmallBlind * 2 + raise_amount;
      players[1].chips -= bigBlindTotal;
      players[1].bet += bigBlindTotal;
      pot += bigBlindTotal;
      console.log(
        `${players[1].name} posts big blind + raise of ${bigBlindTotal}`
      );

      console.log("The pot is now:", pot);

      // Start betting from the next player (after big blind)
      const startingIndex = 2 % players.length;
      simpleRoundOfBetting(players, startingIndex);

      console.log("Pre-flop betting round started.");
      break;
    case "flop":
      console.log("Flop betting round started.");
      break;
    case "turn":
      console.log("Turn betting round started.");
      break;
    case "river":
      console.log("River betting round started.");
      break;
    default:
      console.error("Unknown betting state:", betting_state);
  }
}
function getHighestBet(players) {
  let highestBet = 0;
  for (const player of players) {
    if (player.bet > highestBet) {
      highestBet = player.bet;
    }
  }
  return highestBet;
}
function checkAllBets(players) {
  for (const player of players) {
    if (player.bet !== getHighestBet(players)) {
      return false;
    }
  }
  return true;
}
function simpleRoundOfBetting(players, startingIndex) {
  let index = startingIndex;
  let lastToRaise = -1;

  while (!checkAllBets(players)) {
    const player = players[index];
    const betToMatch = getHighestBet(players);

    if (player.chips > 0 && player.bet < betToMatch) {
      const amountToCall = betToMatch - player.bet;
      player.chips -= amountToCall;
      player.bet += amountToCall;
      pot += amountToCall;
      console.log(`${player.name} calls ${amountToCall} chips. Pot: ${pot}`);
    } else if (player.chips === 0) {
      console.log(`${player.name} is all in.`);
    }

    index = (index + 1) % players.length;
  }
}
function formatCard(card) {
   const faceCardMap = {
    J: "jack",
    Q: "queen",
    K: "king",
    A: "ace",
  };
  let value = card.value;

  // Check and convert face cards
  if (faceCardMap[value]) {
    value = faceCardMap[value];
  }

  return `${value.toLowerCase()}_of_${card.suit.toLowerCase()}.svg`;
}

function getSetPlayerCards(player) {
  // Make sure player has a hand with at least 2 cards
 

  // Get the card image elements
  const card1File = formatCard(player.hand[0]);
  const card2File = formatCard(player.hand[1]);
  console.log(card1File);
  console.log(player.hand[1]);
  document.getElementById(
    `p${player.id}_card_1`
  ).src = `Images/Playing_Cards/SVG-cards-1.3/${card1File}`;
  document.getElementById(
    `p${player.id}_card_2`
  ).src = `Images/Playing_Cards/SVG-cards-1.3/${card2File}`;
}
function setFlopCards(flop) {
  const card1File = formatCard(flop[0]);
  const card2File = formatCard(flop[1]);
  const card3File = formatCard(flop[2]);

  document.getElementById(
    "flop_1"
  ).src = `Images/Playing_Cards/SVG-cards-1.3/${card1File}`;
  document.getElementById(
    "flop_2"
  ).src = `Images/Playing_Cards/SVG-cards-1.3/${card2File}`;
  document.getElementById(
    "flop_3"
  ).src = `Images/Playing_Cards/SVG-cards-1.3/${card3File}`;
}
