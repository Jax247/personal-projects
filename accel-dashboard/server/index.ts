import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import helmet from "helmet";
import mongoose from "mongoose";
import morgan from "morgan";
import dotenv from "dotenv";
import {
  GeneralRouter,
  ClientRouter,
  SalesRouter,
  ManagementRouter,
} from "./routes/";

// Data injection
// import { OverallStat } from "./models/";
// import { dataOverallStat } from "./data/index";

// Config Stuff
dotenv.config();

// Constants
const PORT = process.env.PORT || 9000;
// Add a list of allowed origins.
// If you have more origins you would like to add, you can add them to the array below.
const allowedOrigins = ["http://localhost:3000"];

const CorsOptions: cors.CorsOptions = {
  origin: allowedOrigins,
};

// App & middleware boilerplate
const app = express();
app.use(cors(CorsOptions));
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use(morgan("common"));

// Routers
app.use("/client", ClientRouter);
app.use("/management", ManagementRouter);
app.use("/general", GeneralRouter);
app.use("/sales", SalesRouter);

// Mongoose
mongoose.set("strictQuery", true);

const main = async () => {
  try {
    mongoose.connect(process.env.MONGO_URL as string, () => {
      app.listen(PORT, () => console.log(`Server running on port`, PORT));

      // Data injection
      // User.insertMany(dataUser);
      // Product.insertMany(dataProduct);
      // ProductStat.insertMany(dataProductStat);
      // Transaction.insertMany(dataTransaction)
      // YearlyStats.insertMany(dataOverallStat)
      // AffiliateStat.insertMany(dataAffiliateStat)
      // OverallStat.insertMany(dataOverallStat)

    });
  } catch (e) {
    console.error(e);
  }
};

main();
