import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

import httpStatusText from "./util/httpStatusText.js";

import userRouter from "./routes/userRouter.js";
import foodRouter from "./routes/foodRouter.js";
import categoryRouter from "./routes/categoryRouter.js";
import orderRouter from "./routes/orderRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

// DB Connection
mongoose
  .connect(process.env.DB_CONNECTION_STRING)
  .then(() => {
    console.log("database connected successfully!");
  })
  .catch((error) => {
    console.log(`failed to connect to the database: ${error}`);
  });

// Routes
app.use("/api/v1/user", userRouter);
app.use("/api/v1/food", foodRouter);
app.use("/api/v1/category", categoryRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/images/food", express.static("uploads/food_images"));
app.use("/api/v1/images/category", express.static("uploads/categories_images"));

// global middleware for not found routes
app.all("*", (req, res, next) => {
  res.status(404).json({
    status: httpStatusText.ERROR,
    message: "this resource is not available",
  });
});

// global error handler
app.use((error, req, res, next) => {
  res.status(error.statusCode || 500).json({
    status: error.statusText || httpStatusText.ERROR,
    message: error.message,
    code: error.statusCode || 500,
    data: null,
  });
});

app.listen(process.env.PORT, () => {
  console.log(`server running on port ${process.env.PORT}!`);
});
