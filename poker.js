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
