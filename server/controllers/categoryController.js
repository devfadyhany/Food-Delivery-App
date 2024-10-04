// Node Modules
import { unlink } from "fs/promises";
import path from "path";

// Middlewares
import asyncWrapper from "../middlewares/asyncWrapper.js";

// Utilities
import httpStatusText from "../util/httpStatusText.js";
import appError from "../util/appError.js";

import Category from "../models/category.js";

export const GetAllCategories = asyncWrapper(async (req, res, next) => {
  const query = req.query;

  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const total = (await Category.find()).length;

  const categories = await Category.find({}, { __v: false })
    .limit(limit)
    .skip(skip);

  if (!categories) {
    const error = appError.create(
      "no categories found",
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    page,
    limit,
    total,
    data: [...categories],
  });
});

export const GetCategoryById = asyncWrapper(async (req, res, next) => {
  const category = await Category.findById(req.params.id, { __v: false });

  if (!category) {
    const error = appError.create(
      `category with id:${id} not found`,
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { ...category } });
});

export const AddNewCategory = asyncWrapper(async (req, res, next) => {
  const image_filename = `${req.file.filename}`;

  const categoryExists = await Category.findOne({ name: req.body.name });

  if (categoryExists) {
    const error = appError.create(
      "category already exists!",
      400,
      httpStatusText.FAIL
    );

    await unlink(
      path.join(
        process.cwd(),
        "uploads",
        "categories_images",
        foundCategory.image
      )
    );

    return next(error);
  }

  const createdCategory = Category({
    name: req.body.name,
    image: image_filename,
  });

  await createdCategory.save();

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "new category has been added successfully.",
    data: { ...createdCategory },
  });
});

export const EditCategory = asyncWrapper(async (req, res, next) => {
  const updatedCategory = await Category.updateOne(
    { _id: req.params.id },
    req.body
  );

  if (!updatedCategory) {
    const error = appError.create(
      `category with id:{${req.params.id}} is not found.`,
      404,
      httpStatusText.FAIL
    );

    return next(error);
  }

  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { ...updatedCategory } });
});

export const DeleteCategory = asyncWrapper(async (req, res, next) => {
  const foundCategory = await Category.findById(req.params.id);

  await unlink(
    path.join(
      process.cwd(),
      "uploads",
      "categories_images",
      foundCategory.image
    )
  );

  await Category.deleteOne({ _id: req.params.id });

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: `category {${foundCategory.name}} has been deleted successfully.`,
  });
});
