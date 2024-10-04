// Node Modules
import { unlink } from "fs/promises";
import path from "path";

// Middlewares
import asyncWrapper from "../middlewares/asyncWrapper.js";

// Utilities
import httpStatusText from "../util/httpStatusText.js";
import appError from "../util/appError.js";

import Food from "../models/food.js";

export const GetAllFood = asyncWrapper(async (req, res, next) => {
  const query = req.query;

  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const total = (await Food.find()).length;

  const category = query.category || "All";

  let items;
  if (category === "All") {
    items = await Food.find({}, { __v: false }).limit(limit).skip(skip);
  } else {
    items = await Food.find({ category }, { __v: false });
  }

  if (!items) {
    const error = appError.create("no items found", 404, httpStatusText.FAIL);
    return next(error);
  }

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    page,
    limit,
    total,
    data: [...items],
  });
});

export const GetFoodById = asyncWrapper(async (req, res, next) => {
  const item = await Food.findById(req.params.id, { __v: false });

  if (!item) {
    const error = appError.create(
      `food item with id:${id} not found`,
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { ...item } });
});

export const AddNewFood = asyncWrapper(async (req, res, next) => {
  const image_filename = `${req.file.filename}`;

  const itemExists = await Food.findOne({ name: req.body.name });

  if (itemExists) {
    const error = appError.create(
      "food item already exists!",
      400,
      httpStatusText.FAIL
    );

    await unlink(
      path.join(process.cwd(), "uploads", "food_images", image_filename)
    );

    return next(error);
  }

  const createdItem = new Food({
    name: req.body.name,
    description: req.body.description,
    price: req.body.price,
    category: req.body.category,
    image: image_filename,
  });

  await createdItem.save();

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "new item has been added successfully.",
    data: { ...createdItem },
  });
});

export const EditFood = asyncWrapper(async (req, res, next) => {
  const updatedItem = await Food.updateOne({ _id: req.params.id }, req.body);

  if (!updatedItem) {
    const error = appError.create(
      `food item with id:{${req.params.id}} is not found.`,
      404,
      httpStatusText.FAIL
    );

    return next(error);
  }

  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { ...updatedItem } });
});

export const DeleteFood = asyncWrapper(async (req, res, next) => {
  const foundItem = await Food.findById(req.params.id);

  await unlink(
    path.join(process.cwd(), "uploads", "food_images", foundItem.image)
  );

  await Food.deleteOne({ _id: req.params.id });

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: `food item {${foundItem.name}} has been deleted successfully.`,
  });
});
