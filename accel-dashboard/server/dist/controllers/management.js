"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserPerformanceData = exports.getAdminList = void 0;
const User_1 = __importDefault(require("../models/User"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("../models");
const getUserPerformanceData = async (req, res) => {
    try {
        const { id } = req.params;
        const affiliate = await User_1.default.aggregate([
            { $match: { _id: new mongoose_1.default.Types.ObjectId(id) } },
            {
                $lookup: {
                    from: "affiliatestats",
                    localField: "_id",
                    foreignField: "userId",
                    as: "affiliateStats",
                },
            },
            { $unwind: "$affiliateStats" },
        ]);
        console.log(affiliate[0]);
        const rawSalesTransactions = await Promise.all(affiliate[0].affiliateStats.affiliateSales.map(async (TransactionId) => {
            return await models_1.Transaction.findById(TransactionId);
        }));
        const allSalesTransactions = rawSalesTransactions.filter((transaction) => transaction !== null);
        console.log(allSalesTransactions);
        res.status(200).json({ user: affiliate[0], sales: allSalesTransactions });
    }
    catch (e) {
        res.status(404).json({ message: e.message });
    }
};
exports.getUserPerformanceData = getUserPerformanceData;
const getAdminList = async (_, res) => {
    console.log("Retrieving Admins");
    try {
        const adminList = await User_1.default.find({ role: "admin" }).select("-password");
        res.status(200).json(adminList);
    }
    catch (e) {
        res.status(404).json({ message: e.message });
    }
};
exports.getAdminList = getAdminList;
//# sourceMappingURL=management.js.map