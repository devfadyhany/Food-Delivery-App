import React from "react";
import "./MenuCategory.css";
import { API_BASE_URL } from "../../constants/API";

const MenuCategory = ({ item, category, setCategory }) => {
  const HandleSetCategory = () => {
    setCategory((prev) => (prev === item.name ? "All" : item.name));
  };

  return (
    <div onClick={HandleSetCategory} className="explore-menu-list-item">
      <img
        className={category === item.name ? "active" : ""}
        src={`${API_BASE_URL}/images/category/${item.image}`}
        alt="item-img"
      />
      <p>{item.name}</p>
    </div>
  );
};

export default MenuCategory;
