import express from "express";
import { configDotenv } from "dotenv";
import AuthRoute from "./src/Routes/Auth.route.js";
import connectDB from "./src/db/db.js";
import cors from "cors";
import verifyToken from "./src/Utils/verifyToken.js";
import fetch from "node-fetch";

const app = express();
configDotenv();
app.use(express.json());
app.use(cors());

const PORT = process.env.PORT;

connectDB();
app.use("/auth", AuthRoute);

app.get("/home", verifyToken, (req, res) => {
  res.json("Hello world");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
