export function getWinner(newPlayers, newCommunity) {
  // Helper function to parse card from filename
  function parseCard(cardFile) {
    const parts = cardFile.replace(".svg", "").split("_of_");
    let rank = parts[0];
    const suit = parts[1];

    // Convert face cards and ace to numbers for comparison
    const rankValues = {
      ace: 14,
      king: 13,
      queen: 12,
      jack: 11,
      10: 10,
      9: 9,
      8: 8,
      7: 7,
      6: 6,
      5: 5,
      4: 4,
      3: 3,
      2: 2,
    };

    return {
      rank: rankValues[rank],
      suit: suit,
      display: rank,
    };
  }

  // Helper function to get all possible 5-card combinations
  function getCombinations(arr, k) {
    if (k === 1) return arr.map((x) => [x]);
    const combinations = [];
    for (let i = 0; i <= arr.length - k; i++) {
      const head = arr[i];
      const tailCombs = getCombinations(arr.slice(i + 1), k - 1);
      for (const tailComb of tailCombs) {
        combinations.push([head, ...tailComb]);
      }
    }
    return combinations;
  }

  // Helper function to evaluate a 5-card hand
  function evaluateHand(cards) {
    const sorted = cards.sort((a, b) => b.rank - a.rank);
    const ranks = sorted.map((c) => c.rank);
    const suits = sorted.map((c) => c.suit);

    // Count occurrences of each rank
    const rankCounts = {};
    ranks.forEach((rank) => {
      rankCounts[rank] = (rankCounts[rank] || 0) + 1;
    });

    const counts = Object.values(rankCounts).sort((a, b) => b - a);
    const isFlush = suits.every((suit) => suit === suits[0]);
    const isStraight =
      ranks.every((rank, i) => i === 0 || rank === ranks[i - 1] - 1) ||
      (ranks[0] === 14 &&
        ranks[1] === 5 &&
        ranks[2] === 4 &&
        ranks[3] === 3 &&
        ranks[4] === 2); // A-5 straight

    // Hand rankings (higher number = better hand)
    if (isStraight && isFlush) {
      if (ranks[0] === 14 && ranks[1] === 13)
        return { rank: 10, name: "Royal Flush", tiebreaker: [14] };
      return { rank: 9, name: "Straight Flush", tiebreaker: [ranks[0]] };
    }
    if (counts[0] === 4)
      return {
        rank: 8,
        name: "Four of a Kind",
        tiebreaker: [Object.keys(rankCounts).find((k) => rankCounts[k] === 4)],
      };
    if (counts[0] === 3 && counts[1] === 2)
      return {
        rank: 7,
        name: "Full House",
        tiebreaker: [Object.keys(rankCounts).find((k) => rankCounts[k] === 3)],
      };
    if (isFlush) return { rank: 6, name: "Flush", tiebreaker: ranks };
    if (isStraight)
      return { rank: 5, name: "Straight", tiebreaker: [ranks[0]] };
    if (counts[0] === 3)
      return {
        rank: 4,
        name: "Three of a Kind",
        tiebreaker: [Object.keys(rankCounts).find((k) => rankCounts[k] === 3)],
      };
    if (counts[0] === 2 && counts[1] === 2) {
      const pairs = Object.keys(rankCounts)
        .filter((k) => rankCounts[k] === 2)
        .map(Number)
        .sort((a, b) => b - a);
      return { rank: 3, name: "Two Pair", tiebreaker: pairs };
    }
    if (counts[0] === 2)
      return {
        rank: 2,
        name: "One Pair",
        tiebreaker: [Object.keys(rankCounts).find((k) => rankCounts[k] === 2)],
      };
    return { rank: 1, name: "High Card", tiebreaker: ranks };
  }

  // Helper function to compare hands
  function compareHands(hand1, hand2) {
    if (hand1.rank !== hand2.rank) {
      return hand2.rank - hand1.rank; // Higher rank wins
    }

    // Same hand type, compare tiebreakers
    for (
      let i = 0;
      i < Math.max(hand1.tiebreaker.length, hand2.tiebreaker.length);
      i++
    ) {
      const val1 = hand1.tiebreaker[i] || 0;
      const val2 = hand2.tiebreaker[i] || 0;
      if (val1 !== val2) {
        return val2 - val1; // Higher value wins
      }
    }
    return 0; // Tie
  }

  // Evaluate each player's best hand
  const activePlayers = newPlayers.filter((p) => !p.fold && !p.out);
  const communityCards = newCommunity.map(parseCard);

  const playerResults = activePlayers.map((player) => {
    const playerCards = player.hand.map(parseCard);
    const allCards = [...playerCards, ...communityCards];

    // Get all possible 5-card combinations
    const combinations = getCombinations(allCards, 5);

    // Find the best hand
    let bestHand = null;
    for (const combo of combinations) {
      const handValue = evaluateHand(combo);
      if (!bestHand || compareHands(handValue, bestHand) < 0) {
        bestHand = handValue;
      }
    }

    return {
      player: player,
      bestHand: bestHand,
    };
  });

  // Sort players by best hand (best first)
  playerResults.sort((a, b) => compareHands(a.bestHand, b.bestHand));

  // Update player objects with best hand info
  playerResults.forEach((result) => {
    result.player.bestHand = result.bestHand.name;
    result.player.rank = result.bestHand.rank;
  });

  const winner = playerResults[0];

  // console.log("Community Cards:", newCommunity);
  // console.log("Player Results:");
  playerResults.forEach((result, index) => {
    console.log(
      `${index + 1}. ${result.player.name}: ${
        result.bestHand.name
      } (Hand: ${result.player.hand.join(", ")})`
    );
  });

  // console.log(`\nWinner: ${winner.player.name} with ${winner.bestHand.name}`);

  return {
    winner: winner.player,
    results: playerResults,
    communityCards: newCommunity,
  };
}
