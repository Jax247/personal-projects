"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const AffiliateStatSchema = new mongoose_1.default.Schema({
    userId: { type: mongoose_1.default.Types.ObjectId, ref: "User" },
    affiliateSales: {
        type: [mongoose_1.default.Types.ObjectId],
        ref: "Transaction",
    },
}, { timestamps: true });
const AffiliateStat = mongoose_1.default.model("AffiliateStat", AffiliateStatSchema);
exports.default = AffiliateStat;
//# sourceMappingURL=AffiliateStat.js.map