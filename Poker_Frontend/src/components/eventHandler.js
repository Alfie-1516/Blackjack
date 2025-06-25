import { fetchPlayers } from "./fetchers.js";

export async function handleButtonPress(clickedButton) {
  switch (clickedButton) {
    case "Raise":
      console.log("Player Raised");
      return "Player Raised";
    case "Call":
      console.log("Player Called");
      return "Player Called";
    case "Check":
      console.log("Player Checked");
      return "Player Checked";
    case "Fold":
      console.log("Player Folded");
      return "Player Folded";
    case "All In":
      console.log("Player All In");
      return "Player All In";
    case "Start Game":
      console.log("Player has started the game");
      const players = await fetchPlayers();
      return players;
    default:
      console.log("Unknown");
      return "Unknown";
  }
}
