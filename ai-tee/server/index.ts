import express, { Response } from "express";
import cors from "cors";
import dotenv from "dotenv";
import { ImgGenRouter } from "./routes/imgGen.routes";
import { Log } from "./lib/logger";
dotenv.config();

const PORT = process.env.PORT || 5000;

// const allowedOrigins = ["http://localhost:5176"];

// const CorsOptions: cors.CorsOptions = {
//   origin: allowedOrigins,
// };

Log.debug("hi");

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

app.use("/img-gen", ImgGenRouter);

app.get("/", (_, res: Response) => {
  res.status(200).json({ status: "live" });
});

app.listen(PORT, () => console.log(` Server listening on port ${PORT}`));
