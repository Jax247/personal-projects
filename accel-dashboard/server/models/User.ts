import mongoose from "mongoose";

export type UserType = {
  name: string;
  email: string;
  password: string;
  city: string;
  state: string;
  country: string;
  occcupation: string;
  phoneNumber: string;
  transactions: [];
  role: ["user", "admin", "superadmin"];
};

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    email: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    password: {
      type: String,
      required: true,
      min: 6,
      max: 16,
    },
    city: {
      type: String,
      min: 2,
      max: 15,
    },
    state: {
      type: String,
      min: 2,
      max: 12,
    },
    country: {
      type: String,
      min: 2,
      max: 16,
    },
    occupation: {
      type: String,
      min: 5,
      max: 20,
    },
    phoneNumber: {
      type: String,
      required: true,
      min: 7,
      max: 10,
    },
    transactions: Array,
    role: {
      type: String,
      enum: ["user", "admin", "superadmin"],
      default: "admin",
    },
  },
  { timestamps: true, bufferCommands: false }
);

const User = mongoose.model("User", UserSchema);

export default User;
