import mongoose from "mongoose";
const Schema = mongoose.Schema;

export interface IUser {
  username: string;
  email: string;
  password: string;
}

const Signup = new Schema<IUser>(
  {
    username: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("user", Signup);
export default User;
