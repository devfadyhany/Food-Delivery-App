import React, { useState } from "react";
import "../../pages/Admin/Add/Add";
import axios from "axios";
import { toast } from "react-toastify";
import { adminAssets } from "../../assets/admin/adminAssets";
import { API_BASE_URL } from "../../constants/API";
import { useFetch } from "../../hooks/useFetch";

const AddItemForm = () => {
  const { list, error } = useFetch(
    "category",
    [
      {
        key: "page",
        value: 1,
      },
      {
        key: "limit",
        value: 1000,
      },
    ],
    1000
  );

  if (error) {
    toast.error(error);
  }

  const [itemImage, setItemImage] = useState(false);
  const [itemData, setItemData] = useState({
    name: "",
    description: "",
    price: "",
    category: "",
  });

  const [itemLoading, setItemLoading] = useState(false);
  const [itemError, setItemError] = useState({
    image: false,
    name: false,
    description: false,
    price: false,
    category: false,
  });

  const ValidItemData = (itemImage, itemData) => {
    if (!itemImage) {
      setItemError((errors) => ({ ...errors, image: true }));
      toast.error("Item Image is required.");
    }

    if (itemData.name === "") {
      setItemError((errors) => ({ ...errors, name: true }));
      toast.error("Item Name is required.");
    }

    if (itemData.price === "") {
      setItemError((errors) => ({ ...errors, price: true }));
      toast.error("Item Price is required.");
    }

    if (itemData.category === "") {
      setItemError((errors) => ({ ...errors, category: true }));
      toast.error("Item Category is required.");
    }

    return (
      !itemError.image &&
      !itemError.name &&
      !itemError.price &&
      !itemError.category
    );
  };

  const ItemChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setItemData((data) => ({ ...data, [name]: value }));
    setItemError((data) => ({ ...data, [name]: false }));
  };

  const ItemSubmitHandler = async (e) => {
    e.preventDefault();

    if (!ValidItemData(itemImage, itemData)) {
      return;
    }

    setItemLoading(true);
    const formData = new FormData();

    formData.append("name", itemData.name);
    formData.append("description", itemData.description);
    formData.append("price", Number(itemData.price));
    formData.append("category", itemData.category);
    formData.append("image", itemImage);

    try {
      const response = await axios.post(`${API_BASE_URL}/food`, formData);

      if (response.status === 200) {
        setItemData({
          name: "",
          description: "",
          price: "",
          category: "",
        });
        setItemImage(false);
        toast.success(response.data.message);
        setItemLoading(false);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <form onSubmit={ItemSubmitHandler} className="flex-col">
      <h2>Add New Item</h2>
      <div className="add-img-upload flex-col">
        <p>Upload Image</p>
        <label htmlFor="image">
          <img
            src={
              itemImage
                ? URL.createObjectURL(itemImage)
                : adminAssets.upload_area
            }
            alt=""
            className={itemError.image ? "error" : ""}
          />
        </label>
        <input
          onChange={(e) => {
            setItemImage(e.target.files[0]);
            setItemError((data) => ({ ...data, image: false }));
          }}
          type="file"
          id="image"
          hidden
        />
      </div>

      <div className="add-product-name flex-col">
        <p>Product name</p>
        <input
          onChange={ItemChangeHandler}
          value={itemData.name}
          type="text"
          name="name"
          placeholder="Enter product name"
          className={itemError.name ? "error" : ""}
        />
      </div>

      <div className="add-product-description flex-col">
        <p>Product description</p>
        <textarea
          onChange={ItemChangeHandler}
          value={itemData.description}
          name="description"
          rows="6"
          placeholder="Write product description here"
          className={itemError.description ? "error" : ""}
        ></textarea>
      </div>

      <div className="add-category-price">
        <div className="add-category flex-col">
          <p>Product category</p>
          <select
            value={itemData.category}
            onChange={ItemChangeHandler}
            name="category"
            className={itemError.category ? "error" : ""}
          >
            {list.map((category) => {
              return (
                <option key={category._id} value={category.name}>
                  {category.name}
                </option>
              );
            })}
          </select>
        </div>

        <div className="add-price flex-col">
          <p>Product price</p>
          <input
            onChange={ItemChangeHandler}
            value={itemData.price}
            type="number"
            name="price"
            placeholder="$20"
            className={itemError.price ? "error" : ""}
          />
        </div>
      </div>

      <button type="submit" disabled={itemLoading} className="add-btn">
        Add Item
      </button>
    </form>
  );
};

export default AddItemForm;
