"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const ProductSchema = new mongoose_1.default.Schema({
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
}, { timestamps: true });
const Product = mongoose_1.default.model("Product", ProductSchema);
exports.default = Product;
//# sourceMappingURL=Product.js.map