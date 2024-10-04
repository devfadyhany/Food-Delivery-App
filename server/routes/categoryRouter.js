import express from "express";
import multer from "multer";

import {
  AddNewCategory,
  DeleteCategory,
  EditCategory,
  GetAllCategories,
  GetCategoryById,
} from "../controllers/categoryController.js";

const categoryRouter = express.Router();

// Image Storage Engine
const storage = multer.diskStorage({
  destination: "uploads/categories_images",
  filename: (req, file, cb) => {
    return cb(null, `${Date.now()}${file.originalname}`);
  },
});

const upload = multer({ storage: storage });

categoryRouter.get("/", GetAllCategories);
categoryRouter.get("/:id", GetCategoryById);
categoryRouter.post("/", upload.single("image"), AddNewCategory);
categoryRouter.put("/:id", EditCategory);
categoryRouter.delete("/:id", DeleteCategory);

export default categoryRouter;
