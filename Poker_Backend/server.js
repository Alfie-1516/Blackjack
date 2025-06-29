import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import gameRouter from "./routes/gameRoutes.js";

dotenv.config();
const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect(process.env.MONGO_URI);
app.use("/api/game", gameRouter);

// app.post("/api/game/create", async (req, res) => {
//   try {
//     const defaultGameState = {
//       deck: [],
//       players: [],
//       pot: 0,
//       playerTurn: 0,
//       highestRoundBet: 0,
//       previousAction: "",
//       communityCards: [],
//       round: "preflop",
//       showFlop: false,
//       showRiver: false,
//       showTurn: false,
//       gameOver: false,
//       winner: null,
//       ...req.body, // Override with any provided data
//     };

//     const gameState = new GameState(defaultGameState);
//     await gameState.save();
//     res.json({ message: "Game state created", gameState });
//   } catch (error) {
//     res.status(500).json({ error: "Create failed" });
//   }
// });

// app.get("/api/game/create", (req, res) => {
//   res.json({ message: "Use POST to create a game state" });
// });

// app.post("/api/game/save", async (req, res) => {
//   try {
//     let gameState = await GameState.findOne();
//     if (gameState) {
//       Object.assign(gameState, req.body);
//       await gameState.save();
//       res.json({ message: "Game state saved" });
//     } else {
//       res.status(404).json({ error: "No game state to save" });
//     }
//   } catch (error) {
//     res.status(500).json({ error: "Save failed" });
//   }
// });

// app.get("/api/game/state", async (req, res) => {
//   try {
//     const gameState = await GameState.findOne();
//     if (gameState) {
//       res.json(gameState);
//     } else {
//       res.status(404).json({ error: "No game state found" });
//     }
//   } catch (error) {
//     console.log("Database error:", error);
//     res.status(500).json({ error: "Fetch failed" });
//   }
// });

// app.post("/api/game/reset", async (req, res) => {
//   try {
//     await GameState.deleteMany({});
//     res.json({ message: "Game reset" });
//   } catch (error) {
//     res.status(500).json({ error: "Reset failed" });
//   }
// });

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
