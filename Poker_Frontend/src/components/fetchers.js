export async function fetchPlayers() {
  const response = await fetch("http://localhost:5001/api/game/startGame");
  const data = await response.json();
  return data.allPlayers;
}
