"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductStatSchema = new mongoose_1.default.Schema({
    productId: String,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    year: Number,
    monthlyData: [
        {
            month: String,
            totalSales: Number,
            totalUnits: Number,
        },
    ],
    dailyData: [
        {
            month: String,
            totalSales: Number,
            totalUnits: Number,
        },
    ],
}, { timestamps: true });
const ProductStat = mongoose_1.default.model("ProductStat", ProductStatSchema);
exports.default = ProductStat;
//# sourceMappingURL=ProductStat.js.map