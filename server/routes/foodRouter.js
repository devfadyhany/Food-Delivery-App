import express from "express";
import multer from "multer";

import {
  AddNewFood,
  DeleteFood,
  EditFood,
  GetAllFood,
  GetFoodById,
} from "../controllers/foodController.js";

const foodRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads/food_images",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

foodRouter.get("/", GetAllFood);
foodRouter.get("/:id", GetFoodById);
foodRouter.post("/", upload.single("image"), AddNewFood);
foodRouter.put("/:id", EditFood);
foodRouter.delete("/:id", DeleteFood);

export default foodRouter;
