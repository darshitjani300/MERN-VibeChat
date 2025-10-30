import Signup from "../Models/auth/Signup.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();

const secretKey = process.env.JWT_SECRETKEY;

const SignupController = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res
        ?.status(400)
        ?.json({ message: "All the fields are required." });
    }

    const userExist = await Signup?.findOne({ email });
    if (userExist) {
      return res?.status(409)?.json({
        message: "User already exists.",
      });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = new Signup({
      username,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    let token;
    try {
      token = jwt.sign({ userId: newUser.id, email }, secretKey, {
        expiresIn: "1h",
      });
    } catch (error) {
      return res.status(404).json({ message: "Error generating token" });
    }

    return res.status(201).json({
      message: "User registered successfully.",
      data: {
        userId: newUser.id,
        email: newUser.email,
        userToken: token,
      },
    });
  } catch (error) {
    return res
      ?.status(500)
      ?.json({ message: "Internal server Error", error: error.message });
  }
};

const LoginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: "All the fields are required" });
    }

    let existUser = await Signup.findOne({ email });
    if (!existUser) {
      return res.status(409).json({ message: "User does not exists" });
    }

    //compare password.
    const validPassword = await bcrypt.compare(password, existUser.password);
    if (!validPassword) {
      return res.status(409).json({ message: "Enter valid password" });
    }

    let token;
    try {
      token = jwt.sign(
        {
          userId: existUser?.id,
          email,
        },
        secretKey,
        { expiresIn: "1h" }
      );
    } catch (error) {
      return res.status(404).json({ message: "Error generating token" });
    }

    return res.status(201).json({
      message: "User Login sucessfull",
      data: {
        userId: existUser.id,
        email,
        userToken: token,
      },
    });
  } catch (error) {
    return res.status(500).json({ message: "Internal server error" });
  }
};

export { SignupController, LoginController };
