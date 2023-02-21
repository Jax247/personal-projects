"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const general_1 = require("../controllers/general");
const express_1 = __importDefault(require("express"));
const GeneralRouter = express_1.default.Router();
GeneralRouter.get("/dashboard", general_1.getDashboardData);
GeneralRouter.get("/user/all", general_1.getAllUsers);
GeneralRouter.get("/user/:id", general_1.getUser);
exports.default = GeneralRouter;
//# sourceMappingURL=general.js.map