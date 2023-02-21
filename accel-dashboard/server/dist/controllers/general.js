"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardData = exports.getAllUsers = exports.getUser = void 0;
const User_1 = __importDefault(require("../models/User"));
const models_1 = require("../models");
const getDashboardData = async (_, res) => {
    try {
        const _month = "November";
        const _year = 2021;
        const _date = "2021-11-15";
        const transactions = await models_1.Transaction.find({})
            .limit(50)
            .sort({ createdOn: -1 });
        const yearlyStats = await models_1.YearlyStats.find({ year: _year });
        const { totalCustomers, yearlySalesTotal, yearlyTotalSoldUnits, monthlyData, salesByCategory, } = yearlyStats[0];
        const currentMonthStats = yearlyStats[0].monthlyData.find(({ month }) => {
            return month === _month;
        });
        const todaysStats = yearlyStats[0].dailyData.find(({ date }) => {
            return date === _date;
        });
        res.status(200).json({
            totalCustomers,
            yearlySalesTotal,
            yearlyTotalSoldUnits,
            monthlyData,
            salesByCategory,
            transactions,
            currentMonthStats,
            todaysStats,
        });
    }
    catch (e) {
        res.status(404).json({ message: e.message });
    }
};
exports.getDashboardData = getDashboardData;
const getUser = async (req, res) => {
    console.log("Retrieving User");
    try {
        const { id } = req.params;
        console.log("Retrieving User");
        const user = await User_1.default.findById(id);
        res.status(200).json(user);
    }
    catch (e) {
        res.status(404).json({ message: e.message });
    }
};
exports.getUser = getUser;
const getAllUsers = async (_, res) => {
    console.log("Retrieving All Users");
    try {
        const userList = await User_1.default.find({});
        res.status(200).json(userList);
    }
    catch (e) {
        res.status(404).json({ message: e.message });
    }
};
exports.getAllUsers = getAllUsers;
//# sourceMappingURL=general.js.map