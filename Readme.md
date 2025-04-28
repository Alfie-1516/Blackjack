# Blackjack Betting Interface

This feature adds a betting interface to a blackjack game, allowing players to wager part of their bankroll.

## 1. Add a Bankroll to the Data Model
- Represent the **bankroll** as the money the player is willing to risk (not their total assets).

## 2. Define Bankroll Accessor Functions
- **`getBankroll()`**  
  - Global function that returns the current value of the bankroll variable.
- **`setBankroll(newBalance)`**  
  - Global function that sets the bankroll to `newBalance` (must be an integer).

## 3. Initialize the Bankroll
- Set the player's initial bankroll to **2022**.
- Use only **whole dollars** (integers).

## 4. Build the Betting Interface in HTML
- Add a `#betting` section (initially hidden with `display: none`):
  - A `<span>` that displays the bankroll (e.g., `$2022`).
  - A **Material textfield** with the ID `#users-wager` for entering a wager.
  - A **Material button** with:
    - Text: **"Bet"**
    - `onclick`: Calls a function `makeWager()`

- **`makeWager()`** should:
  - `console.log()` the value entered in `#users-wager`
  - Call `timeToPlay()`

## 5. Define the `timeToBet()` Function
- Globally scoped function that:
  - **Hides** the `#playersActions` section (via
