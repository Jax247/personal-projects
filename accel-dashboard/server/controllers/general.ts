import User from "../models/User";
import { Request, Response } from "express";
import { Transaction, YearlyStats } from "../models";
// import { YearlyStatType } from "models/YearlyStat";

const getDashboardData = async (_: Request, res: Response) => {
  try {
    // Mock value
    const _month = "November";
    const _year = 2021;
    const _date = "2021-11-15";

    // Get the last 50 transactions, sort in desc order
    const transactions = await Transaction.find({})
      .limit(50)
      .sort({ createdOn: -1 });

    // Get yearly Stats

    const yearlyStats = await YearlyStats.find({ year: _year });

    const {
      totalCustomers,
      yearlySalesTotal,
      yearlyTotalSoldUnits,
      monthlyData,
      salesByCategory,
    } = yearlyStats[0];

    // get this months data

    const currentMonthStats = yearlyStats[0].monthlyData.find(({ month }) => {
      return month === _month;
    });
    // get todays data
    const todaysStats = yearlyStats[0].dailyData.find(({ date }) => {
      return date === _date;
    });
    // Send data to Client
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
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

const getUser = async (req: Request, res: Response) => {
  // get User from mongoose
  console.log("Retrieving User");

  try {
    const { id } = req.params;

    console.log("Retrieving User");

    const user = await User.findById(id);

    res.status(200).json(user);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};
const getAllUsers = async (_: any, res: Response) => {
  console.log("Retrieving All Users");

  try {
    const userList = await User.find({});

    res.status(200).json(userList);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export { getUser, getAllUsers, getDashboardData };
