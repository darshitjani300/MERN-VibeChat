import express, { Request, Response } from "express";
import { config as configDotenv } from "dotenv";
import AuthRoute from "./Routes/Auth.route.js";
import connectDB from "./db/db.js";
import cors from "cors";
import verifyToken from "./Utils/verifyToken.js";

const app = express();
configDotenv();

app.use(express.json());
app.use(cors());

const PORT = process.env.PORT || 3000;

connectDB();

app.use("/auth", AuthRoute);

app.get("/home", verifyToken, (req: Request, res: Response) => {
  res.json("Hello world");
});

app.get("/", (_req: Request, res: Response) => {
  res.send("✅ Server is running fine");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
