import {
  getAdminList,
  getUserPerformanceData,
} from "../controllers/management";

import express from "express";

const ManagementRouter = express.Router();

ManagementRouter.get("/admins", getAdminList);
ManagementRouter.get("/performance/:id", getUserPerformanceData);

export default ManagementRouter;
