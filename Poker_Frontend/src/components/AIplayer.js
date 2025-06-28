// AIplayer.js
export default function getAIAction(
  playerChips,
  playerBet,
  highestRoundBet,
  hasRaised = false
) {
  const requiredCallAmount = highestRoundBet - playerBet;

  const canCall = playerChips >= requiredCallAmount && requiredCallAmount > 0;
  const canCheck = requiredCallAmount === 0;
  const canRaise = false; // Prevent raise if already raised

  // --- Simulate random hand strength ---
  const getHandStrength = () => {
    const strengths = ["weak", "medium", "strong"];
    return strengths[Math.floor(Math.random() * strengths.length)];
  };

  const strength = getHandStrength();

  // --- Determine raise amount ---
  const getRaiseAmount = () => {
    const minRaise = 10;
    const maxAvailableForRaise = playerChips - requiredCallAmount;
    const raise = Math.floor(
      maxAvailableForRaise * (Math.random() * 0.2 + 0.1)
    );
    return Math.max(minRaise, Math.min(raise, maxAvailableForRaise));
  };

  // --- Decision logic based on random strength ---
  if (strength === "strong" && canRaise) {
    const raiseAmount = getRaiseAmount();
    return { action: "Raise", amount: raiseAmount };
  }

  if (strength === "medium") {
    if (canCheck) return { action: "Check" };
    if (canCall) return { action: "Call" };
    // Remove raise option for medium hands if already raised
    if (canRaise && Math.random() > 0.6) {
      const raiseAmount = getRaiseAmount();
      return { action: "Raise", amount: raiseAmount };
    }
    return { action: "Fold" };
  }

  if (strength === "weak") {
    if (canCheck) return { action: "Check" };
    if (canCall && Math.random() > 0.7) return { action: "Call" };
    return { action: "Fold" };
  }

  // Fallbacks
  if (canCheck) return { action: "Check" };
  if (canCall) return { action: "Call" };
  return { action: "Fold" };
}
