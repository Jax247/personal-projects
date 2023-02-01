import mongoose, { Document, Schema } from "mongoose";

export interface TransactionType extends Document {
  _id: string;
  userId: string;
  cost: number;
  products: string[];
}

const TransactionSchema = new Schema({
  userId: {
    type: String,
    required: true,
  },
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
  products: {
    type: [mongoose.Types.ObjectId],
    of: Number,
    required: true,
  },
},{timestamps: true});

const Transaction = mongoose.model("Transactions", TransactionSchema);

export default Transaction;
