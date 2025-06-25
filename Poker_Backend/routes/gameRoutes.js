import express from "express";
import { startGame } from "../controllers/mainController.js";
import { startBetting } from "../controllers/bettingController.js";
import { gameState } from "../controllers/stateController.js";
import { playerAction } from "../controllers/actionController.js";
import { nextRound } from "../controllers/roundController.js";

const router = express.Router();

router.get("/startGame", startGame);
router.get("/startBetting", startBetting);
router.get("/gameState", gameState);
router.post("/playerAction", playerAction);
router.get("/nextRound", nextRound);
router;

export default router;
