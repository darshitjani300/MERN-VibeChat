import express, { Request, Response } from "express";
import { config as configDotenv } from "dotenv";
import AuthRoute from "./Routes/Auth.route.js";
import connectDB from "./db/db.js";
import cors from "cors";
import requireAuth from "./Utils/verifyToken.js";
import cookieParser from "cookie-parser";
import { createServer } from "http";
import { Server } from "socket.io";
import ProfileRoute from "./Routes/Profile.route.js";

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
app.use("/images", express.static("public/images"));

const server = createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    credentials: true,
  },
});

const PORT = process.env.PORT || 3000;

connectDB();

io.on("connection", (socket) => {
  console.log("User connected ", socket.id);
  socket.emit("welcome", "Welcome to my server huihuihui");
});

app.use("/v1/auth", AuthRoute);
app.use("/v1", ProfileRoute)

app.get("/home", requireAuth, (req: Request, res: Response) => {
  res.json("Hello world");
});

app.get("/", (_req: Request, res: Response) => {
  res.send("✅ Server is running fine");
});

server.listen(PORT, () => {
  console.log(`Server is running on port http://localhost:${PORT}`);
});
