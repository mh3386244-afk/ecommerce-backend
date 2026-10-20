import express from "express";
import { DBconnection } from "./src/DB/connection.js";
import { config } from "dotenv";
import userRouter from "./src/Modules/User/user.routes.js";
import Authrouter from "./src/Modules/Auth/Auth.routes.js";
import categoryRouter from "./src/Modules/Category/category.routes.js";
import subcategoryRouter from "./src/Modules/Subcategory/subcategory.routes.js";

config();
const app = express();

app.use(express.json());

app.use("/user", userRouter);
app.use("/auth", Authrouter);
app.use("/categories", categoryRouter);
app.use("/subcategories", subcategoryRouter);

app.use((req, res, next) => {
    res.status(404).json({ message: "Invalid URL" });
});

app.use((err, req, res, next) => {
    return res.status(err.status || 500).json({ message: err.message });
});

DBconnection();

app.listen(process.env.PORT, () => {
    console.log("Server is running");
});