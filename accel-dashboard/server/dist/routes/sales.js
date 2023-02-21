"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sales_1 = require("../controllers/sales");
const express_1 = __importDefault(require("express"));
const SalesRouter = express_1.default.Router();
SalesRouter.get("/sales/", sales_1.getSales);
exports.default = SalesRouter;
//# sourceMappingURL=sales.js.map