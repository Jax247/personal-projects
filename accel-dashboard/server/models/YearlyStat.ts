import mongoose, { Schema } from "mongoose";

type MonthlyData = {
  _id: string;
  month: string;
  totalSales: number;
  totalUnits: number;
};
type DailyData = {
  date: string;
  month: string;
  totalSales: number;
  totalUnits: number;
};

export type YearlyStatType = {
  totalCustomers: number;
  yarlySalesTotal: number;
  yearlyTotalSoldUnits: number;
  year: number;
  monthlyData: Array<MonthlyData>;
  dailyData: Array<DailyData>;
  salesByCategory: {
    shoes: number;
    clothing: number;
    accesssories: number;
    misc: number;
  };
};

const YearlyStatSchema = new Schema(
  {
    year: Number,
    totalCustomers: Number,
    yearlySalesTotal: Number,
    yearlyTotalSoldUnits: Number,
    monthlyData: [
      {
        month: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    dailyData: [
      {
        date: String,
        totalSales: Number,
        totalUnits: Number,
      },
    ],
    salesByCategory: {
      type: Map,
      of: Number,
    },
  },
  { timestamps: true }
);

const YearlyStats = mongoose.model("YearlyStats", YearlyStatSchema)

export default YearlyStats;
