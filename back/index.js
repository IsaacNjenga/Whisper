import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { Router } from "./routes/routes.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());

app.use("/whisper", Router);

app.get("/", (req, res) => {
  res.send("Server good ");
});
const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
