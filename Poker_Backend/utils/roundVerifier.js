export function roundVerifier(state) {
  // Filter out players who have folded or are out of the game
  const activePlayers = state.players.filter(
    (player) => !player.fold && !player.out && !player.allIn
  );

  // If no active players or only one active player, round should end
  if (activePlayers.length <= 1) {
    return true;
  }

  const roundBet = state.highestRoundBet;

  // Check if all active players have made at least one play
  const allHaveMoreThanOne = activePlayers.every(
    (player) => player.allPlays.length >= 1
  );

  // Check if all active players have matching bets (or are all-in)
  const allEqualBet = activePlayers.every(
    (player) => player.bet === roundBet || player.allIn || player.chips === 0
  );

  if (allHaveMoreThanOne && allEqualBet) {
    return true;
  }

  return false;
}
