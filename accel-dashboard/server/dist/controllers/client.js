"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getGeography = exports.getTransactions = exports.getCustomers = exports.getAllItemsWithStats = exports.getItemWithStats = exports.getAllItems = exports.getItem = void 0;
const models_1 = require("../models");
const CountryMapping_1 = __importDefault(require("../Lib/CountryMapping"));
const getCustomers = async (_, res) => {
    try {
        const cList = await models_1.User.find({ role: "user" }).select("-password");
        res.status(200).json(cList);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};
exports.getCustomers = getCustomers;
const getTransactions = async (req, res) => {
    const defaultSort = { ["userId"]: 1 };
    const { page = 1, pageSize = 20, sort, search } = req.query;
    const pageS = page;
    const pageSizeS = pageSize;
    const pageJump = pageS * pageSizeS;
    const sortT = () => {
        if (sort == undefined) {
            return defaultSort;
        }
        const parsedSort = JSON.parse(sort);
        if (parsedSort[0] === undefined) {
            return defaultSort;
        }
        const OutboundSort = {
            [parsedSort[0].field]: parsedSort[0].sort == "asc" ? 1 : -1,
        };
        return OutboundSort;
    };
    console.log("Search", search);
    const formattedSortJSON = sortT();
    console.log("Formatted ", formattedSortJSON);
    try {
        const tList = await models_1.Transaction.find({
            $or: [
                { userId: new RegExp(search, "i") },
                {
                    cost: !Number.isNaN(parseInt(search))
                        ? parseInt(search)
                        : 118.18,
                },
            ],
        })
            .sort(formattedSortJSON)
            .skip(pageJump)
            .limit(pageSizeS);
        const total = await models_1.Transaction.countDocuments({
            name: { $regex: search, $options: "i" },
        });
        res.status(200).json({ tList, total });
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};
exports.getTransactions = getTransactions;
const getGeography = async (_, res) => {
    try {
        const users = await models_1.User.find();
        const mappedLocations = users.reduce((acc, { country }) => {
            const countryCode3 = (0, CountryMapping_1.default)(country);
            if (!acc[countryCode3]) {
                acc[countryCode3] = 0;
            }
            acc[countryCode3]++;
            return acc;
        }, {});
        console.log(mappedLocations);
        const formattedMappedLocations = Object.entries(mappedLocations).map((locationData) => {
            let country = locationData[0];
            let value = locationData[1];
            return { id: country, value };
        });
        console.log("Formatted GeoData: ", formattedMappedLocations);
        res.status(200).json(formattedMappedLocations);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};
exports.getGeography = getGeography;
const getItem = async (req, res) => {
    const { id } = req.body;
    try {
        const item = await models_1.Product.findOne({ id });
        res.status(200).json(item);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};
exports.getItem = getItem;
const getAllItems = async (_, res) => {
    try {
        const itemList = await models_1.Product.find({});
        res.status(200).json(itemList);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};
exports.getAllItems = getAllItems;
const getItemWithStats = async (req, res) => {
    const { id } = req.body;
    try {
        const item = await models_1.Product.findOne({ id });
        const itemWithStats = await models_1.ProductStat.findOne({ productId: item._id });
        res.status(200).json(itemWithStats);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};
exports.getItemWithStats = getItemWithStats;
const getAllItemsWithStats = async (_, res) => {
    try {
        const itemList = await models_1.Product.find({});
        console.log(itemList);
        console.log("Type of Doc", typeof itemList);
        const itemListWithStats = await Promise.all(itemList.map(async (item) => {
            if (item && ProductItem(item)) {
                const stats = await models_1.ProductStat.findOne({ productId: item._id });
                console.log("to obj new ", item);
                stats === null || stats === void 0 ? void 0 : stats.toObject();
                return Object.assign(Object.assign({}, item._doc), { stats });
            }
            return item;
        }));
        console.log("final obj", itemListWithStats);
        res.status(200).json(itemListWithStats);
    }
    catch (e) {
        res.status(400).json({ message: e.message });
    }
};
exports.getAllItemsWithStats = getAllItemsWithStats;
function ProductItem(object) {
    if (object !== null && typeof object === "object") {
        return "_doc" in object;
    }
    return false;
}
//# sourceMappingURL=client.js.map