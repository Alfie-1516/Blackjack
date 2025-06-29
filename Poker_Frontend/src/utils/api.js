const API_BASE = import.meta.env.VITE_API_BASE_URL;

async function handleFetch(url, options) {
  try {
    const response = await fetch(url, options);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data = await response.json();
    return data;
  } catch (error) {
    console.error(`Fetch error at ${url}:`, error);
    throw error; // rethrow for caller to handle if needed
  }
}

export async function startNextRound() {
  return handleFetch(`${API_BASE}/game/nextRound`);
}

export async function continueGame() {
  return handleFetch(`${API_BASE}/game/gameState`);
}

export async function getAllPlayers() {
  const data = await handleFetch(`${API_BASE}/game/gameState`);
  return data.allPlayers;
}

export async function startNewGame() {
  const data = await handleFetch(`${API_BASE}/game/startGame`);
  return data.allPlayers;
}

export async function handlePlayerAction(action, amount) {
  const body = {
    action,
    ...(amount !== undefined && { amount }),
  };

  const data = await handleFetch(`${API_BASE}/game/playerAction`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });

  return data;
}
