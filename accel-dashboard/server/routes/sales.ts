import { getSales } from "../controllers/sales";
import express from "express";

const SalesRouter = express.Router();

SalesRouter.get("/sales/", getSales);

export default SalesRouter;
