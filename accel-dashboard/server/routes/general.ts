import { getUser, getAllUsers } from "../controllers/general";
import express from "express";

const GeneralRouter = express.Router();

GeneralRouter.get("/user/all", getAllUsers);
GeneralRouter.get("/user/:id", getUser);

GeneralRouter.get("/", (_, res) => {
    console.log("hello Me")
    res.status(200).json({ message: "Hello Me"})
})

export default GeneralRouter;
