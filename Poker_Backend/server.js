import express from "express";
import cors from "cors";
import routes from "./routes/gameRoutes.js"; // Adjust the path as necessary

const app = express();
app.use(express.json());
app.use(cors());
app.use("/api/game", routes);
app.get("/api", (req, res) => {
  res.json({ users: ["Alice", "Bob", "Charlie"] });
});

app.listen(5001, () => {
  console.log("Server is running on port 5001");
});
