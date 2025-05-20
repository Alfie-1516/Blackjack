let bankRoll = 0;
var pot = 0;
let playerTurn = false;
let raiseAmount = 0;
let bettingComplete = false;

const betButton = document.getElementById("bet_button");
const betAmountInput = document.getElementById("bet_amount");
const currentBankRoll = document.getElementById("bet_roll");
const onScreenPot = document.getElementById("pot");
const p1Chips = document.getElementById("p1_chips");
const p2Chips = document.getElementById("p2_chips");
const p3Chips = document.getElementById("p3_chips");

// Event listener for the bet button
betButton.addEventListener("click", () => {
  const userInput = parseFloat(betAmountInput.value);
  if (!isNaN(userInput) && userInput > 0) {
    setBankRoll(userInput);
    currentBankRoll.textContent = `Bank Roll: $${getBankRoll()}`;
  } else {
    currentBankRoll.textContent = "Please enter a valid bet amount.";
  }
});
function getPot() {
  return pot;
}
function updatePotOnScreen(players) {
  updatePotImage(pot)
  if (onScreenPot) {
    onScreenPot.textContent = `Pot Value: $${pot}`;
    p1Chips.textContent = ` ${players[0].chips}`;
    p2Chips.textContent = `Chips Remaining: $${players[1].chips}`;
    p3Chips.textContent = `Chips Remaining: $${players[2].chips}`;
  }
}
function showBestHand(player){
  rank = document.getElementById("p1_rank")
  hand = document.getElementById("p1_hand")
  rank.textContent = `: ${player.bestHand.rank}`
  hand.textContent = `: ${player.bestHand.name}`
  console.log(player.bestHand.rank)
  console.log(player.bestHand.name)
}
function updatePotImage(pot){
 const potImage = document.getElementById("potImage");
  if (!potImage) return;

  if (pot < 100) {
    potImage.src = "Images/small.jpg";
  } else if (pot < 500) {
    potImage.src = "Images/medium.jpg";
  } else {
    potImage.src = "Images/large.jpg";
  }
}
function timeToBet() {
  playerTurn = !playerTurn;
  const betModal = document.getElementById("bet_modal");
  betModal.style.display = playerTurn ? "block" : "none";
}

async function start_game() {
  onScreenPot.textContent = `Updated Pot: $${pot}`;
  const deck = shuffleDeck(createDeck());
  const players = createPlayers();
  dealToPlayers(deck, players);
  getSetPlayerCards(players[1]);
  getSetPlayerCards(players[0]);
  getSetPlayerCards(players[2]);
  await startBettingRound("flop", players);

  console.log("All players have matched the highest bet or are all in.");
  console.log("End of pre-flop betting round.");
  const flop = dealFlop(deck);
  setFlopCards(flop);
  await startBettingRound("turn", players);
  const turn = dealTurn(deck);
  setTurnCard(turn);
  await startBettingRound("river", players);
  const river = dealRiver(deck);
  setRiverCard(river);
  await startBettingRound("final", players);
  const communityCards = [...flop, turn, river];
  checkPlayersBestHands(players, communityCards);
  showBestHand(players[0])
}

function setBankRoll(value) {
  bankRoll = value;
}
function getBankRoll() {
  return bankRoll;
}
function waitForPlayerAction() {
  return new Promise((resolve) => {
    const buttons = document.querySelectorAll(".action-button");
    buttons.forEach((button) => {
      const handler = () => {
        buttons.forEach((btn) => btn.removeEventListener("click", handler));
        resolve(button.textContent); // Resolve with the action name
      };
      button.addEventListener("click", handler);
    });
  });
}

async function make_wager() {
  console.log("Waiting for player action...");
  const action = await waitForPlayerAction();
  const betAmount = parseFloat(document.getElementById("raise_amount").value);

  switch (action) {
    case "Raise":
      raiseAmount = betAmount;
      console.log(`Player raised to ${raiseAmount}`);
      break;
    case "Call":
      console.log(`Player called with ${betAmount}`);
      break;
    case "Check":
      console.log("Player checked");
      break;
    default:
      console.error("Unknown action:", action);
  }
}
function createDeck() {
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
  return suits.flatMap((suit) => values.map((value) => ({ suit, value })));
}

function shuffleDeck(deck) {
  for (let i = deck.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [deck[i], deck[j]] = [deck[j], deck[i]];
  }
  return deck;
}

function deal_card(deck) {
  return deck.pop();
}

function createPlayers() {
  return [
    { id: 1, name: "Player 1", hand: [], chips: 1000, bet: 0, timesPlayed: 0 },
    { id: 2, name: "Player 2", hand: [], chips: 1000, bet: 0, timesPlayed: 0 },
    { id: 3, name: "Player 3", hand: [], chips: 1000, bet: 0, timesPlayed: 0 },
  ];
}

function dealToPlayers(deck, players) {
  for (let i = 0; i < 2; i++) {
    players.forEach((player) => player.hand.push(deal_card(deck)));
  }
}

function dealFlop(deck) {
  return [deal_card(deck), deal_card(deck), deal_card(deck)];
}

function dealTurn(deck) {
  return deal_card(deck);
}

function dealRiver(deck) {
  return deal_card(deck);
}

async function startBettingRound(bettingState, players) {
  switch (bettingState) {
    case "flop":
      const smallBlind = 10;
      const bigBlind = smallBlind * 2;
      pot = 0;

      // Small Blind - Player 1
      players[0].chips -= smallBlind;
      players[0].bet += smallBlind;
      players[0].timesPlayed += 1;
      players[1].timesPlayed += 1;
      pot += smallBlind;
      updatePotOnScreen(players);
      console.log(`${players[0].name} posts small blind of ${smallBlind}`);

      const action = await waitForPlayerAction(); // Await player's action
      const betAmountInput =
        parseFloat(document.getElementById("raise_amount").value) || 0;

      switch (action) {
        case "Raise":
          if (betAmountInput <= 0) {
            console.log("Invalid raise amount.");
            break;
          }
          const totalRaise = bigBlind + betAmountInput;
          if (players[1].chips >= totalRaise) {
            players[1].chips -= totalRaise;
            players[1].bet += totalRaise;
            pot += totalRaise;
            console.log(
              `${players[1].name} raises by ${betAmountInput}. Total bet: ${players[1].bet}. Pot: ${pot}`
            );
          } else {
            console.log(`${player.name} does not have enough chips to raise.`);
          }
          break;

        case "Call":
          if (players[1].chips >= bigBlind) {
            players[1].chips -= bigBlind;
            players[1].bet += bigBlind;
            pot += bigBlind;
            console.log(
              `${players[1].name} calls. Bet: ${players[1].bet}. Pot: ${pot}`
            );
          } else {
            console.log(
              `${players[1].name} does not have enough chips to call.`
            );
          }
          break;
      }
      updatePotOnScreen(players);
      // Wait for the betting round to complete
      await simpleRoundOfBetting(players, 2);

      console.log("Pre-flop betting round completed.");
      break;
    case "turn":
      console.log("Turn betting round started.");
      resetBets_TimesPlayed(players);
      console.log(players);
      bettingComplete = !bettingComplete;
      await simpleRoundOfBetting(players, 0);

      break;
    case "river":
      console.log("River betting round started.");
      resetBets_TimesPlayed(players);
      console.log(players);
      bettingComplete = !bettingComplete;
      await simpleRoundOfBetting(players, 0);
      break;
    case "final":
      console.log("Final betting round started.");
      resetBets_TimesPlayed(players);
      console.log(players);
      bettingComplete = !bettingComplete;
      await simpleRoundOfBetting(players, 0);
      break;
    default:
      console.error("Unknown betting state:", bettingState);
  }
}

function getHighestBet(players) {
  return Math.max(...players.map((player) => player.bet));
}

function checkAllBets(players) {
  const highestBet = getHighestBet(players);
  return players.every((player) => player.bet === highestBet);
}

function checkTimesPlayed(players) {
  const minTimesPlayed = 1;
  return players.every((player) => player.timesPlayed >= minTimesPlayed);
}
function resetBets_TimesPlayed(players) {
  players.forEach((player) => {
    player.bet = 0;
    player.timesPlayed = 0;
  });
}

async function simpleRoundOfBetting(players, startingIndex) {
  let index = startingIndex;

  while (!bettingComplete) {
    const player = players[index];
    const highestBet = getHighestBet(players);
    const amountToCall = highestBet - player.bet;

    if (player.chips > 0) {
      console.log(
        `${player.name}'s turn. Chips: ${player.chips}, Current Bet: ${player.bet}, Amount to Call: ${amountToCall}`
      );
      player.timesPlayed += 1;

      const action = await waitForPlayerAction(); // Await player's action
      const betAmountInput =
        parseFloat(document.getElementById("raise_amount").value) || 0;
      generateOptionsArray(players)
      switch (action) {
        case "Raise":
          if (betAmountInput <= 0) {
            console.log("Invalid raise amount.");
            break;
          }
          const totalRaise = amountToCall + betAmountInput;
          if (player.chips >= totalRaise) {
            player.chips -= totalRaise;
            player.bet += totalRaise;
            pot += totalRaise;
            console.log(
              `${player.name} raises by ${betAmountInput}. Total bet: ${player.bet}. Pot: ${pot}`
            );
          } else {
            console.log(`${player.name} does not have enough chips to raise.`);
          }
          break;

        case "Call":
          if (player.chips >= amountToCall) {
            player.chips -= amountToCall;
            player.bet += amountToCall;
            pot += amountToCall;
            console.log(
              `${player.name} calls. Bet: ${player.bet}. Pot: ${pot}`
            );
          } else {
            console.log(`${player.name} does not have enough chips to call.`);
          }
          break;

        case "Check":
          if (amountToCall === 0) {
            console.log(`${player.name} checks.`);
          } else {
            console.log(
              `${player.name} cannot check. There is an outstanding bet of ${amountToCall}.`
            );
          }
          break;

        default:
          console.error("Unknown action:", action);
      }
    } else {
      console.log(`${player.name} is all in.`);
    }
    console.log(players);
    // Check if all players have matched the highest bet or are all in
    if (checkTimesPlayed(players)) {
      bettingComplete = checkAllBets(players);
    }
    updatePotOnScreen(players);

    // Move to the next player
    index = (index + 1) % players.length;
  }
  console.log("Betting round complete.");
}

function formatCard(card) {
  const faceCardMap = { J: "jack", Q: "queen", K: "king", A: "ace" };
  let value = faceCardMap[card.value] || card.value;
  return `${value.toLowerCase()}_of_${card.suit.toLowerCase()}.svg`;
}

function getSetPlayerCards(player) {
  if (!player.hand || player.hand.length < 2) return;
  const card1File = formatCard(player.hand[0]);
  const card2File = formatCard(player.hand[1]);
  document.getElementById(
    `p${player.id}_card_1`
  ).src = `Images/Playing_Cards/SVG-cards-1.3/${card1File}`;
  document.getElementById(
    `p${player.id}_card_2`
  ).src = `Images/Playing_Cards/SVG-cards-1.3/${card2File}`;
}

function setFlopCards(flop) {
  if (!flop || flop.length < 3) return;
  const [card1, card2, card3] = flop.map(formatCard);
  document.getElementById(
    "flop_1"
  ).src = `Images/Playing_Cards/SVG-cards-1.3/${card1}`;
  document.getElementById(
    "flop_2"
  ).src = `Images/Playing_Cards/SVG-cards-1.3/${card2}`;
  document.getElementById(
    "flop_3"
  ).src = `Images/Playing_Cards/SVG-cards-1.3/${card3}`;
}
function setTurnCard(turn) {
  card = formatCard(turn);
  document.getElementById(
    "turn"
  ).src = `Images/Playing_Cards/SVG-cards-1.3/${card}`;
}
function setRiverCard(river) {
  card = formatCard(river);
  document.getElementById(
    "river"
  ).src = `Images/Playing_Cards/SVG-cards-1.3/${card}`;
}
function evaluateBestHand(cards) {
  // cards: array of 7 card objects, each {suit, value}
  const valuesOrder = [
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
  const valueCounts = {};
  const suitCounts = {};
  const values = [];
  const suits = [];

  // Count values and suits
  for (const card of cards) {
    valueCounts[card.value] = (valueCounts[card.value] || 0) + 1;
    suitCounts[card.suit] = (suitCounts[card.suit] || 0) + 1;
    values.push(card.value);
    suits.push(card.suit);
  }

  // Helper: get sorted unique values as numbers
  const uniqueValues = [...new Set(values)]
    .map((v) => valuesOrder.indexOf(v))
    .sort((a, b) => a - b);

  // Check for flush
  let flushSuit = null;
  for (const suit in suitCounts) {
    if (suitCounts[suit] >= 5) {
      flushSuit = suit;
      break;
    }
  }

  // Check for straight (and straight flush)
  function hasStraight(vals) {
    let count = 1;
    for (let i = 1; i < vals.length; i++) {
      if (vals[i] === vals[i - 1] + 1) {
        count++;
        if (count >= 5) return true;
      } else if (vals[i] !== vals[i - 1]) {
        count = 1;
      }
    }
    // Special case: A-2-3-4-5
    if (vals.includes(12) && vals.slice(0, 4).toString() === "0,1,2,3")
      return true;
    return false;
  }

  // Check for straight flush / royal flush
  let isStraightFlush = false;
  let isRoyalFlush = false;
  if (flushSuit) {
    const flushCards = cards.filter((card) => card.suit === flushSuit);
    const flushVals = flushCards
      .map((card) => valuesOrder.indexOf(card.value))
      .sort((a, b) => a - b);
    isStraightFlush = hasStraight(flushVals);
    isRoyalFlush =
      isStraightFlush &&
      flushVals.includes(8) &&
      flushVals.includes(9) &&
      flushVals.includes(10) &&
      flushVals.includes(11) &&
      flushVals.includes(12);
  }

  // Count multiples
  const counts = Object.values(valueCounts).sort((a, b) => b - a);
  const four = counts[0] === 4;
  const three = counts[0] === 3;
  const pairs = counts.filter((c) => c === 2).length;

  // Hand ranking
  if (isRoyalFlush) return { rank: 10, name: "Royal Flush" };
  if (isStraightFlush) return { rank: 9, name: "Straight Flush" };
  if (four) return { rank: 8, name: "Four of a Kind" };
  if (three && pairs >= 1) return { rank: 7, name: "Full House" };
  if (flushSuit) return { rank: 6, name: "Flush" };
  if (hasStraight(uniqueValues)) return { rank: 5, name: "Straight" };
  if (three) return { rank: 4, name: "Three of a Kind" };
  if (pairs >= 2) return { rank: 3, name: "Two Pair" };
  if (pairs === 1) return { rank: 2, name: "One Pair" };
  return { rank: 1, name: "High Card" };
}
function generateOptionsArray(players) {
  maxBet = getHighestBet(players);
  if (maxBet === 0) {
    const raiseButton = document.getElementById("raise");
    raiseButton.style.display =  "block"
    const checkButton = document.getElementById("check");
    checkButton.style.display =  "block"
     const callButton = document.getElementById("call");
    callButton.style.display =  "none"
  } else {
    const raiseButton = document.getElementById("raise");
    raiseButton.style.display =  "block"
    const callButton = document.getElementById("call");
    callButton.style.display =  "block"
    const checkButton = document.getElementById("check");
    checkButton.style.display =  "none"
  }
}
// Example usage for all players:
function checkPlayersBestHands(players, communityCards) {
  players.forEach((player) => {
    const allCards = [...player.hand, ...communityCards];
    player.bestHand = evaluateBestHand(allCards);
  });
}
