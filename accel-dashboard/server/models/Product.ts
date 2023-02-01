import mongoose, { Document } from "mongoose";

// Define product schema and type
// interface DocumentResult<T> {
//   _doc: T;
// }

export interface ProductType extends Document{
  _id: number;
  name: String;
  price: Number;
  description: String;
  category: String;
  rating: Number;
  supply: Number;
  _doc: Omit<this,'_doc'>;
}

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    price: {
      type: Number,
      required: true,
    },
    description: {
      type: String,
      required: true,
      min: 20,
      max: 300,
    },
    category: {
      type: String,
      required: true,
      min: 2,
      max: 50,
    },
    rating: {
      type: Number,
      required: true,
    },
    supply: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;
