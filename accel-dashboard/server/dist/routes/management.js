"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const management_1 = require("../controllers/management");
const express_1 = __importDefault(require("express"));
const ManagementRouter = express_1.default.Router();
ManagementRouter.get("/admins", management_1.getAdminList);
ManagementRouter.get("/performance/:id", management_1.getUserPerformanceData);
exports.default = ManagementRouter;
//# sourceMappingURL=management.js.map