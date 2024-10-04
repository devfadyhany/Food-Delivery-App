import React, { useState } from "react";
import "../../pages/Admin/Add/Add";
import axios from "axios";
import { toast } from "react-toastify";
import { adminAssets } from "../../assets/admin/adminAssets";
import { API_BASE_URL } from "../../constants/API";

const AddCategoryForm = () => {
  const [image, setImage] = useState(false);
  const [name, setName] = useState("");

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({
    image: false,
    name: false,
  });

  const ValidData = (categoryImage, categoryName) => {
    if (!categoryImage) {
      setError((errors) => ({ ...errors, image: true }));
      toast.error("Category Image is required.");
    }

    if (categoryName === "") {
      setError((errors) => ({ ...errors, name: true }));
      toast.error("Category Name is required.");
    }

    return !error.image && !error.name;
  };

  const SubmitHandler = async (e) => {
    e.preventDefault();

    if (!ValidData(image, name)) {
      return;
    }

    setLoading(true);
    const formData = new FormData();

    formData.append("name", name);
    formData.append("image", image);

    try {
      const response = await axios.post(`${API_BASE_URL}/category`, formData);

      if (response.status === 200) {
        setName("");
        setImage(false);
        toast.success(response.data.message);
        setLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={SubmitHandler} className="flex-col">
      <h2>Add New Category</h2>
      <div className="add-img-upload flex-col">
        <p>Upload Image</p>
        <label htmlFor="category_image">
          <img
            src={image ? URL.createObjectURL(image) : adminAssets.upload_area}
            alt=""
            className={error.image ? "error" : ""}
          />
        </label>
        <input
          onChange={(e) => {
            setImage(e.target.files[0]);
            setError((data) => ({ ...data, image: false }));
          }}
          type="file"
          id="category_image"
          hidden
        />
      </div>

      <div className="add-product-name flex-col">
        <p>Category name</p>
        <input
          onChange={(e) => {
            setName(e.target.value);
            setError((data) => ({ ...data, name: false }));
          }}
          value={name}
          type="text"
          name="name"
          placeholder="Enter category name"
          className={error.name ? "error" : ""}
        />
      </div>

      <button type="submit" disabled={loading} className="add-btn">
        Add Category
      </button>
    </form>
  );
};

export default AddCategoryForm;
