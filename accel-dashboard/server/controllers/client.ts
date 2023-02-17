import { countryMap } from "./../Lib/CountryMapping/index";
import { ProductType } from "../models/Product";
import { Product, ProductStat, Transaction, User } from "../models";
import { Request, Response } from "express";
import { SortOrder } from "mongoose";
import getCountryISO3 from "../Lib/CountryMapping";

const getCustomers = async (_: Request, res: Response) => {
  try {
    // Get Customers
    const cList = await User.find({ role: "user" }).select("-password");

    res.status(200).json(cList);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const getTransactions = async (req: Request, res: Response) => {
  // get Needed Page data from req query string
  // sort should look like this: { "field": "userId", "sort": "desc"} from frontend
  type Sort = {
    field: string;
    sort: string;
  };

  const defaultSort = { ["userId"]: 1 as SortOrder };

  const { page = 1, pageSize = 20, sort, search } = req.query;
  const pageS = page as number;
  const pageSizeS = pageSize as number;
  const pageJump = pageS * pageSizeS;

  const sortT = () => {
    if (sort == undefined) {
      return defaultSort;
    }
    // Parse incoming JSON
    const parsedSort: Array<Sort> = JSON.parse(sort as string);

    if (parsedSort[0] === undefined) {
      return defaultSort;
    }

    const OutboundSort: { [x: string]: SortOrder } = {
      [parsedSort[0].field]: parsedSort[0].sort == "asc" ? 1 : -1,
    };

    return OutboundSort;
  };

  console.log("Search", search);
  const formattedSortJSON = sortT();

  console.log("Formatted ", formattedSortJSON);
  try {
    // Get Transactions but send only needed data to the client for pages
    const tList = await Transaction.find({
      $or: [
        { userId: new RegExp(search as string, "i") },
        {
          cost: !Number.isNaN(parseInt(search as string))
            ? parseInt(search as string)
            : 118.18,
        },
      ],
    })
      .sort(formattedSortJSON)
      .skip(pageJump)
      .limit(pageSizeS);

    const total = await Transaction.countDocuments({
      name: { $regex: search, $options: "i" },
    });

    res.status(200).json({ tList, total });
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const getGeography = async (_: Request, res: Response) => {

  try {
    // Use country data from user tables

    const users = await User.find();

    const mappedLocations = users.reduce(
      (acc: countryMap | any, { country }) => {
        const countryCode3 = getCountryISO3(country as string);
        //  if country doesnt already existt set it, otherwise inc
        if (!acc[countryCode3]) {
          acc[countryCode3] = 0;
        }

        acc[countryCode3]++;

        return acc;
      },
      {} as countryMap
    );

    console.log(mappedLocations);
    // Must format for Nivo Chart input in Frontend
    // format is {id: country, value: count}
    // Object.Entries to get values and properties
    const formattedMappedLocations = Object.entries(mappedLocations).map(
      (locationData) => {
        let country = locationData[0]
        let value = locationData[1]

        return { id: country, value };
      }
    );
    console.log("Formatted GeoData: " , formattedMappedLocations);


    res.status(200).json(formattedMappedLocations);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};

const getItem = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    // Get Item
    const item = await Product.findOne({ id });

    res.status(200).json(item);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
const getAllItems = async (_: any, res: Response) => {
  try {
    const itemList = await Product.find({});

    res.status(200).json(itemList);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
const getItemWithStats = async (req: Request, res: Response) => {
  const { id } = req.body;

  try {
    // Get Item
    const item = await Product.findOne({ id });

    const itemWithStats = await ProductStat.findOne({ productId: item!._id });

    res.status(200).json(itemWithStats);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
const getAllItemsWithStats = async (_: any, res: Response) => {
  try {
    const itemList = await Product.find({});
    console.log(itemList);
    console.log("Type of Doc", typeof itemList);

    const itemListWithStats = await Promise.all(
      itemList.map(async (item: unknown) => {
        if (item && ProductItem(item)) {
          const stats = await ProductStat.findOne({ productId: item._id });
          console.log("to obj new ", item);
          stats?.toObject();
          return {
            ...item._doc,
            stats,
          };
        }
        return item;
      })
    );

    console.log("final obj", itemListWithStats);
    res.status(200).json(itemListWithStats);
  } catch (e) {
    res.status(400).json({ message: e.message });
  }
};
function ProductItem(object: unknown): object is ProductType {
  if (object !== null && typeof object === "object") {
    return "_doc" in object;
  }

  return false;
}

export {
  getItem,
  getAllItems,
  getItemWithStats,
  getAllItemsWithStats,
  getCustomers,
  getTransactions,
  getGeography,
};
