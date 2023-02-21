"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ManagementRouter = exports.SalesRouter = exports.ClientRouter = exports.GeneralRouter = void 0;
const general_1 = __importDefault(require("./general"));
exports.GeneralRouter = general_1.default;
const client_1 = __importDefault(require("./client"));
exports.ClientRouter = client_1.default;
const sales_1 = __importDefault(require("./sales"));
exports.SalesRouter = sales_1.default;
const management_1 = __importDefault(require("./management"));
exports.ManagementRouter = management_1.default;
//# sourceMappingURL=index.js.map