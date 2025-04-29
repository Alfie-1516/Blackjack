let bankRoll = 0;

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

// Function to set the bank roll
function setBankRoll(value) {
  bankRoll = value;
}

// Function to get the bank roll
function getBankRoll() {
  return bankRoll;
}
