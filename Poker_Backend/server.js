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

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
