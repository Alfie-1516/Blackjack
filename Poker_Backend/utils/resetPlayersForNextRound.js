export function resetPlayersForNextRound(players) {
  return players.map((player) => {
    if (player.chips > 0) {
      return {
        ...player,
        fold: false,
        bet: 0,
      };
    }
    return player;
  });
}
