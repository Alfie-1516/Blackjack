export function playSummarizer(player, action, amount) {
  switch (action) {
    case "Call":
      return `player ${player} calls`;
    case "Raise":
      return `player ${player} raises by ${amount}`;
    case "Check":
      return `player ${player} checks`;
    case "Fold":
      return `player ${player} Folds`;
    default:
      return `player ${player} `;
  }
}
