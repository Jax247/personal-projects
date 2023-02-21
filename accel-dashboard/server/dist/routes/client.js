"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("../controllers/client");
const express_1 = __importDefault(require("express"));
const ClientRouter = express_1.default.Router();
ClientRouter.get('/products/', client_1.getItemWithStats);
ClientRouter.get('/products/all', client_1.getAllItemsWithStats);
ClientRouter.get('/customers', client_1.getCustomers);
ClientRouter.get('/transactions', client_1.getTransactions);
ClientRouter.get('/geography', client_1.getGeography);
exports.default = ClientRouter;
//# sourceMappingURL=client.js.map