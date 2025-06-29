import { fetchPlayers } from "./fetchers.js";
import { getAllPlayers } from "../utils/api.js";

export async function handleButtonPress(clickedButton) {
  switch (clickedButton) {
    case "Raise":
      return "Player Raised";
    case "Call":
      return "Player Called";
    case "Check":
      return "Player Checked";
    case "Fold":
      return "Player Folded";
    case "All In":
      return "Player All In";
    case "Start Game":
      const players = await getAllPlayers;
      return players;
    default:
      return "Unknown";
  }
}
