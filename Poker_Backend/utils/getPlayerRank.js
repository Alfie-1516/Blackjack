// Function 1: Get all player ranks and hand names
export function getPlayersRanked(players, communityCards) {
  const community = communityCards.map(convertCard);

  return players.map((player) => {
    const fullHand = [...player.hand, ...community].map(convertCard);
    const solved = Hand.solve(fullHand);
    return {
      name: player.name,
      handName: solved.name,
      rank: solved.rank,
    };
  });
}
