let bankRoll = 0;
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
    }
    else {
        betModal.style.display = "none"; 
    }
}
function start_game() {
    const deck = create_deck();
    const shuffledDeck = shuffle_deck(deck);
    const players = create_players();
    
    dealToPlayers(shuffledDeck, players);
    console.log("Players created:", players);
    console.log("Game started. Players have been dealt their cards.");
}


// Function to set the bank roll
function setBankRoll(value) {
  bankRoll = value;
}

// Function to get the bank roll
function getBankRoll() {
  return bankRoll;
}

function make_wager(value){
    const betAmount = document.getElementById('raise_amount').value;
    switch (value) {
        case 'Raise':
            console.log(`Raise bet: ${betAmount}`);
            // Add logic for raising the bet
            break;
        case 'Call':
            console.log(`Call bet: ${betAmount}`);
            // Add logic for calling the bet
            break;
        case 'Check':
            console.log('Check action triggered');
            // Add logic for checking
            break;
        default:
            console.error('Unknown action:', value);
    }
}

function create_deck() {
    const suits = ['Hearts', 'Diamonds', 'Clubs', 'Spades'];
    const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A'];
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
function create_players(){
    const player1 = {
        name: "Player 1",
        hand: [],
        chips: 1000,
        bet: 0
    };
    const player2 = {
        name: "Player 2",
        hand: [],
        chips: 1000,
        bet: 0
    };
    const player3 = {
        name: "Player 2",
        hand: [],
        chips: 1000,
        bet: 0
    };
    const player4 = {
        name: "Player 2",
        hand: [],
        chips: 1000,
        bet: 0
    };
    const player5 = {
        name: "Player 2",
        hand: [],
        chips: 1000,
        bet: 0
    };
    const player6 = {
        name: "Player 2",
        hand: [],
        chips: 1000,
        bet: 0
    };
    return [player1, player2, player3, player4, player5, player6];
}
function dealToPlayers(deck, players) {
    for (let i = 0; i < 2; i++) {
        for (const player of players) {
            const card = deal_card(deck);
            player.hand.push(card);
        }
    }
}
