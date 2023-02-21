"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    name: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    email: {
        type: String,
        required: true,
        min: 2,
        max: 50,
    },
    password: {
        type: String,
        required: true,
        min: 6,
        max: 16,
    },
    city: {
        type: String,
        min: 2,
        max: 15,
    },
    state: {
        type: String,
        min: 2,
        max: 12,
    },
    country: {
        type: String,
        min: 2,
        max: 16,
    },
    occupation: {
        type: String,
        min: 5,
        max: 20,
    },
    phoneNumber: {
        type: String,
        required: true,
        min: 7,
        max: 10,
    },
    transactions: Array,
    role: {
        type: String,
        enum: ["user", "admin", "superadmin"],
        default: "admin",
    },
}, { timestamps: true, bufferCommands: false });
const User = mongoose_1.default.model("User", UserSchema);
exports.default = User;
//# sourceMappingURL=User.js.map