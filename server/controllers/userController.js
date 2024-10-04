// Third-party Modules
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
dotenv.config();

// Middlewares
import asyncWrapper from "../middlewares/asyncWrapper.js";

// Utilities
import httpStatusText from "../util/httpStatusText.js";
import appError from "../util/appError.js";
import { SendConfirmationEmail } from "../util/confirmationEmail.js";
import generateJWT from "../util/generateJWT.js";

import User from "../models/user.js";

export const GetAllUsers = asyncWrapper(async (req, res, next) => {
  const query = req.query;

  const limit = query.limit || 10;
  const page = query.page || 1;
  const skip = (page - 1) * limit;
  const total = (await User.find()).length;

  const users = await User.find({}, { __v: false }).limit(limit).skip(skip);

  if (!users) {
    const error = appError.create("no users found", 404, httpStatusText.FAIL);
    return next(error);
  }

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    page,
    limit,
    total,
    data: [...users],
  });
});

export const GetUserById = asyncWrapper(async (req, res, next) => {
  const user = await User.findById(req.params.id, { __v: false });

  if (!user) {
    const error = appError.create(
      `user with id:${id} not found`,
      404,
      httpStatusText.FAIL
    );
    return next(error);
  }

  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { ...user } });
});

export const Register = asyncWrapper(async (req, res, next) => {
  const user = req.body;

  const userExists = await User.findOne({ email: user.email });

  if (userExists) {
    const error = appError.create(
      "user already exists!",
      400,
      httpStatusText.FAIL
    );

    return next(error);
  }

  const hashedPassword = await bcrypt.hash(user.password, 10);

  const createdUser = User({
    username: user.username,
    email: user.email,
    password: hashedPassword,
  });

  const token = await generateJWT({ id: createdUser._id });

  await SendConfirmationEmail(user.email, token);

  await createdUser.save();

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "confirmation email has been sent successfully",
    data: { ...createdUser },
  });
});

export const Login = asyncWrapper(async (req, res, next) => {
  const user = req.body;

  const userFound = await User.findOne({ email: user.email });

  if (!userFound) {
    const error = appError.create(
      "wrong credintials!",
      404,
      httpStatusText.FAIL
    );

    return next(error);
  }

  const passwordMatch = await bcrypt.compare(user.password, userFound.password);

  if (!passwordMatch) {
    const error = appError.create(
      "wrong credintials!",
      404,
      httpStatusText.FAIL
    );

    return next(error);
  }

  if (!userFound.confirmed) {
    const error = appError.create(
      "please, confirm your email first!",
      400,
      httpStatusText.FAIL
    );

    return next(error);
  }

  const token = await generateJWT({ id: userFound._id });

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: "Logged-In Successfully!",
    token,
    data: {
      id: userFound._id,
      username: userFound.username,
      email: userFound.email,
      role: userFound.role,
    },
  });
});

export const ConfirmEmail = asyncWrapper(async (req, res, next) => {
  const token = req.body.token;

  if (!token) {
    const error = appError.create("token not found!", 404, httpStatusText.FAIL);
    return next(error);
  }

  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, payload) => {
    if (err || !payload.id) {
      const error = appError.create(
        "Token is Invalid!",
        400,
        httpStatusText.FAIL
      );

      return next(error);
    }

    await User.updateOne({ _id: payload.id }, { confirmed: true });

    return res.status(200).json({
      status: httpStatusText.SUCCESS,
      message: "Your email has been confirmed!",
    });
  });
});

export const EditUser = asyncWrapper(async (req, res, next) => {
  const updatedUser = await User.updateOne({ _id: req.params.id }, req.body);

  if (!updatedUser) {
    const error = appError.create(
      `user with id:{${req.params.id}} is not found.`,
      404,
      httpStatusText.FAIL
    );

    return next(error);
  }

  return res
    .status(200)
    .json({ status: httpStatusText.SUCCESS, data: { updatedUser } });
});

export const DeleteUser = asyncWrapper(async (req, res, next) => {
  const deletedUser = await User.deleteOne({ _id: req.params.id });

  if (!deletedUser) {
    const error = appError.create(
      `user with id:{${req.params.id}} is not found.`,
      404,
      httpStatusText.FAIL
    );

    return next(error);
  }

  return res.status(200).json({
    status: httpStatusText.SUCCESS,
    message: `user {${req.params.id}} has been deleted successfully.`,
  });
});
