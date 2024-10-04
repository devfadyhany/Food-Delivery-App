// Third-party Modules
import dotenv from "dotenv";
dotenv.config();

// Middlewares
import asyncWrapper from "../middlewares/asyncWrapper.js";

// Utilities
import {
  CheckPaymentSuccess,
  GetAuthenticationToken,
  GetOrderId,
  GetPaymentKey,
} from "../util/paymob.js";
import httpStatusText from "../util/httpStatusText.js";
import appError from "../util/appError.js";

import order from "../models/order.js";

export const CreatePaymentLink = asyncWrapper(async (req, res, next) => {
  const { items, amount, ...shippingDetails } = req.body;

  const paymobAuthToken = await GetAuthenticationToken();

  const paymobOrderId = await GetOrderId(
    paymobAuthToken,
    (100 * amount).toString(),
    "EGP",
    items
  );

  const paymobPaymentKey = await GetPaymentKey(
    paymobAuthToken,
    paymobOrderId,
    (100 * amount).toString(),
    "EGP",
    shippingDetails
  );

  const createdOrder = new order({
    user_id: shippingDetails.user_id,
    first_name: shippingDetails.first_name,
    last_name: shippingDetails.last_name,
    email: shippingDetails.email,
    phone: shippingDetails.phone,
    street: shippingDetails.street,
    city: shippingDetails.city,
    floor_number: shippingDetails.floor_number,
    amount: amount,
    items: items,
    paymobOrderId: paymobOrderId,
  });

  await createdOrder.save();

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "payment link has been created successfully",
    url: `https://accept.paymob.com/api/acceptance/iframes/871911?payment_token=${paymobPaymentKey}`,
  });
});

export const PlaceOrder = asyncWrapper(async (req, res, next) => {
  const paymobOrderId = req.params.id;

  const paymentSucceeded = await CheckPaymentSuccess(paymobOrderId);

  if (!paymentSucceeded) {
    const error = appError.create("Payment Failed!", 400, httpStatusText.FAIL);

    return next(error);
  }

  await order.updateOne({ paymobOrderId: paymobOrderId }, { payment: true });

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "order has been placed successfully",
  });
});

export const GetUserOrders = asyncWrapper(async (req, res, next) => {
  const userId = req.params.userId;

  const orders = await order.find({ user_id: userId }, { __v: false });

  if (!orders) {
    const error = appError.create("no orders found", 404, httpStatusText.FAIL);
    return next(error);
  }

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    data: [...orders],
  });
});

export const GetAllOrders = asyncWrapper(async (req, res, next) => {
  const query = req.query;

  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const total = (await order.find()).length;

  const orders = await order.find({}, { __v: false }).limit(limit).skip(skip);

  if (!orders) {
    const error = appError.create("no orders found", 404, httpStatusText.FAIL);
    return next(error);
  }

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    page,
    limit,
    total,
    data: [...orders],
  });
});

export const UpdateOrderStatus = asyncWrapper(async (req, res, next) => {
  const orderid = req.params.id;
  const newStatus = req.body.status;

  await order.updateOne({ _id: orderid }, { status: newStatus });

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "order status has been updated successfully",
  });
});
