import mongoose, { Types } from "mongoose";

export interface IProfile {
  userId: Types.ObjectId;
  name: string;
  about: string;
  picture: string;
}

const profileModel = new mongoose.Schema<IProfile>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "users",
      required: true,
    },
    name: {
      type: String,
    },
    about: {
      type: String,
    },
    picture: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const Profile = mongoose.model("profile", profileModel);
export default Profile;
