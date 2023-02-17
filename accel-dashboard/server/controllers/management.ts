import User from "../models/User";
// import Transactions from "../models/Transaction";
import { Request, Response } from "express";
import mongoose from "mongoose";
import { AffiliateUser } from "models/AffiliateStat";
import { Transaction } from "../models";

const getUserPerformanceData = async (req: Request, res: Response) => {
  // perform aggregate call to lookup affiliate userid and affiliate stats associated

  try {
    const { id } = req.params;

    const affiliate: AffiliateUser[] = await User.aggregate([
      // steps to complete in mongo

      // Step 1 match id in Mongo
      { $match: { _id: new mongoose.Types.ObjectId(id) } },
      // step 2, Lookup affiliateStats with the id retrieved in step 1, still calling from user table
      {
        $lookup: {
          from: "affiliatestats",
          localField: "_id",
          foreignField: "userId",
          as: "affiliateStats",
        },
      },
      // step 3, format the data
      { $unwind: "$affiliateStats" },
    ]);

    console.log(affiliate[0]);

    const rawSalesTransactions = await Promise.all(
      affiliate[0].affiliateStats.affiliateSales.map(async (TransactionId) => {
        return await Transaction.findById(TransactionId);
      })
    );

    const allSalesTransactions = rawSalesTransactions.filter(
      (transaction) => transaction !== null
    );
    console.log(allSalesTransactions);

    res.status(200).json({ user: affiliate[0], sales: allSalesTransactions });
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

const getAdminList = async (_: any, res: Response) => {
  console.log("Retrieving Admins");

  try {
    const adminList = await User.find({ role: "admin" }).select("-password");

    res.status(200).json(adminList);
  } catch (e) {
    res.status(404).json({ message: e.message });
  }
};

export { getAdminList, getUserPerformanceData };
