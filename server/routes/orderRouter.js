import express from "express";

import {
  CreatePaymentLink,
  GetAllOrders,
  GetUserOrders,
  PlaceOrder,
  UpdateOrderStatus,
} from "../controllers/orderController.js";

const orderRouter = express.Router();

orderRouter.get("/", GetAllOrders);
orderRouter.get("/user/:userId", GetUserOrders);
orderRouter.post("/create-payment-link", CreatePaymentLink);
orderRouter.post("/:id", PlaceOrder);
orderRouter.put("/:id", UpdateOrderStatus);

export default orderRouter;
