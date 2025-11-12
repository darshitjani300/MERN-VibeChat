import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload, Secret } from "jsonwebtoken";

interface IAuthenticated extends Request {
  userId?: string;
}

const verifyToken = (
  req: IAuthenticated,
  res: Response,
  next: NextFunction
) => {
  const authHeader = req.header("Authorization");
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ error: "Access denied" });

  try {
    const secretKey = process.env.JWT_SECRETKEY;
    const decoded = jwt.verify(token, secretKey as Secret) as JwtPayload;

    req.userId = decoded.userId;

    next();
  } catch (error) {
    return res.status(403).json({ message: "Invalid token" });
  }
};

export default verifyToken;
