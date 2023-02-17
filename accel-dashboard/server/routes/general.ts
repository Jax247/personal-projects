import { getUser, getAllUsers, getDashboardData } from "../controllers/general";
import express from "express";

const GeneralRouter = express.Router();

GeneralRouter.get("/dashboard", getDashboardData);
GeneralRouter.get("/user/all", getAllUsers);
GeneralRouter.get("/user/:id", getUser);

export default GeneralRouter;
