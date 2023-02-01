import User from "../models/User";
import { Request, Response } from "express";

const getUser = async (req: Request, res: Response) => {
  // get User from mongoose
  console.log("Retrieving User");

  try {
    const { id } = req.params;

    console.log("Retrieving User");

    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
const getAllUsers = async (_: any, res: Response) => {
  console.log("Retrieving All Users");

  try {
    const userList = await User.find({});

    res.status(200).json(userList);
    
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export { getUser, getAllUsers };
