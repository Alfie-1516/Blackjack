import mongoose from "mongoose";

const gameStateSchema = new mongoose.Schema({
  deck: [String],
  players: [mongoose.Schema.Types.Mixed],
  pot: Number,
  playerTurn: Number,
  highestRoundBet: Number,
  previousAction: String,
  communityCards: [String],
  round: String,
  showFlop: Boolean,
  showRiver: Boolean,
  showTurn: Boolean,
  gameOver: Boolean,
  winner: mongoose.Schema.Types.Mixed,
});

export default mongoose.model("GameState", gameStateSchema);
