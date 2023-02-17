import mongoose from "mongoose";
import { UserType } from "./User";

export interface AffiliateStatType {
  affiliateStats: { userId: string; affiliateSales: string[] };
}
export type AffiliateUser = UserType & AffiliateStatType;

const AffiliateStatSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Types.ObjectId, ref: "User" },
    affiliateSales: {
      type: [mongoose.Types.ObjectId],
      ref: "Transaction",
    },
  },
  { timestamps: true }
);

const AffiliateStat = mongoose.model("AffiliateStat", AffiliateStatSchema);
export default AffiliateStat;
