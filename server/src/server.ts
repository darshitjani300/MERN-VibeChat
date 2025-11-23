import express, { Request, Response } from "express";
import { config as configDotenv } from "dotenv";
import AuthRoute from "./Routes/Auth.route.js";
import connectDB from "./db/db.js";
import cors from "cors";
import requireAuth from "./Utils/verifyToken.js";
import cookieParser from "cookie-parser";

const app = express();
configDotenv();

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(cookieParser());

const PORT = process.env.PORT || 3000;

connectDB();

app.use("/auth", AuthRoute);

app.get("/home", requireAuth, (req: Request, res: Response) => {
  res.json("Hello world");
});

app.get("/", (_req: Request, res: Response) => {
  res.send("✅ Server is running fine");
});

app.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
