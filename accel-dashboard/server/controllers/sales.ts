import YearlyStats from "../models/YearlyStat";
import { Request, Response } from "express";

const getSales = async (_: Request, res: Response) => {
  try {
    const YearlySalesData = await YearlyStats.find()

    res.status(200).json(YearlySalesData[0])
  } catch (error) {
    res.status(404).json({ message: error.message });
  }
};

export { getSales };
