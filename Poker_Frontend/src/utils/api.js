const API_BASE = "/api";

export async function startNextRound() {
  try {
    const response = await fetch("http://localhost:5001/api/game/nextRound");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch players:", error);
  }
}

export async function continueGame() {
  try {
    const response = await fetch("http://localhost:5001/api/game/gameState");
    const data = await response.json();
    return data;
  } catch (error) {
    console.error("Failed to fetch players:", error);
  }
}
export async function getAllPlayers() {
  try {
    const response = await fetch("http://localhost:5001/api/game/gameState");
    const data = await response.json();
    return data.allPlayers;
  } catch (error) {
    console.error("Failed to fetch players:", error);
  }
}

export async function startNewGame() {
  try {
    const response = await fetch("http://localhost:5001/api/game/startGame");
    const data = await response.json();
    return data.allPlayers;
  } catch (error) {
    console.error("Failed to fetch players:", error);
  }
}
export async function handlePlayerAction(action, amount) {
  try {
    const res = await fetch("http://localhost:5001/api/game/playerAction", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        action: action,
        // Include amount if it exists (though AI won't raise, it might be needed)
        ...(amount && { amount: amount }),
      }),
    });
    const result = await res.json();
    console.log("Action result:", result);
  } catch (error) {
    console.error("Failed to send action:", error);
  }
}
