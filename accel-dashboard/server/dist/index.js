"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const mongoose_1 = __importDefault(require("mongoose"));
const morgan_1 = __importDefault(require("morgan"));
const dotenv_1 = __importDefault(require("dotenv"));
const routes_1 = require("./routes/");
dotenv_1.default.config();
const PORT = process.env.PORT || 9000;
const allowedOrigins = ["http://localhost:3000"];
const CorsOptions = {
    origin: allowedOrigins,
};
const app = (0, express_1.default)();
app.use((0, cors_1.default)(CorsOptions));
app.use(express_1.default.json());
app.use(body_parser_1.default.json());
app.use(body_parser_1.default.urlencoded({ extended: true }));
app.use((0, helmet_1.default)());
app.use(helmet_1.default.crossOriginResourcePolicy({ policy: "cross-origin" }));
app.use((0, morgan_1.default)("common"));
app.use("/client", routes_1.ClientRouter);
app.use("/management", routes_1.ManagementRouter);
app.use("/general", routes_1.GeneralRouter);
app.use("/sales", routes_1.SalesRouter);
mongoose_1.default.set("strictQuery", true);
const main = async () => {
    try {
        mongoose_1.default.connect(process.env.MONGO_URL, () => {
            app.listen(PORT, () => console.log(`Server running on port`, PORT));
        });
    }
    catch (e) {
        console.error(e);
    }
};
main();
//# sourceMappingURL=index.js.map