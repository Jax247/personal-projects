"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getSales = void 0;
const YearlyStat_1 = __importDefault(require("../models/YearlyStat"));
const getSales = async (_, res) => {
    try {
        const YearlySalesData = await YearlyStat_1.default.find();
        res.status(200).json(YearlySalesData[0]);
    }
    catch (error) {
        res.status(404).json({ message: error.message });
    }
};
exports.getSales = getSales;
//# sourceMappingURL=sales.js.map