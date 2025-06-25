export function turnManager(player) {
  if (player === 6) {
    return 1;
  }
  return (player += 1);
}
