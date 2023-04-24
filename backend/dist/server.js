"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const db_1 = require("./config/db");
const body_parser_1 = __importDefault(require("body-parser"));
const PORT = process.env.PORT || 5000;
const app = (0, express_1.default)();
(0, db_1.connectDB)();
app.use(body_parser_1.default);
app.get("/", (req, res) => {
    res.send("Hello World!");
});
app.use("/api/users", require("./routes/userRoutes"));
// app.use(errorHandler);
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
