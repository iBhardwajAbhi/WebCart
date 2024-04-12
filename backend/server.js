import express, { json } from "express";
import cors from "cors";
import bodyParser from "body-parser";
import "dotenv/config";
import dbConnect from "./db.js";
import authRouter from "./routes/authRoutes.js";
import productRouter from "./routes/productRoutes.js";
import categoryRoutes from "./routes/categoryRoutes.js";

import formidable from "express-formidable";
import orderRouter from "./routes/orderRoutes.js";

const app = express();

app.use(json());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
// app.use(formidable());

app.use("/api/auth", authRouter);
app.use("/api/product", productRouter);
app.use("/api/category", categoryRoutes);
app.use("/api/order", orderRouter);

dbConnect().then(() => {
  app.listen(process.env.PORT, () => {
    console.log("server listening at 3001");
  });
});
