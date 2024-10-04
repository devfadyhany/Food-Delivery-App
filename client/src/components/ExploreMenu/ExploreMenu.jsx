import React, { useRef } from "react";
import "./ExploreMenu.css";
import MenuCategory from "../MenuCategory/MenuCategory";
import { toast } from "react-toastify";
import { useFetch } from "../../hooks/useFetch";

const ExploreMenu = ({ category, setCategory }) => {
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
    0
  );

  if (error) {
    toast.error(error);
  }

  const menuRef = useRef();

  return (
    <div className="explore-menu" id="menu">
      <h1>Explore our menu</h1>
      <p className="explore-menu-text">
        Choose from a diverse menu featuring a delectable array of dishes
        crafted with the finest ingredients and culinary expertise. Our mission
        is to satisfy your cravings and elevate your dining experience, one
        delicious meal at a time.
      </p>
      <div className="explore-menu-list">
        <button
          className="menu-btn-left"
          onClick={() => {
            if (menuRef.current.scrollLeft > 0) {
              menuRef.current.scrollLeft -= 500;
            }
          }}
        >
          &lt;
        </button>
        <div ref={menuRef} className="menu-list">
          {list.map((item) => {
            return (
              <MenuCategory
                key={item._id}
                item={item}
                category={category}
                setCategory={setCategory}
              />
            );
          })}
        </div>
        <button
          className="menu-btn-right"
          onClick={() => {
            menuRef.current.scrollLeft += 500;
          }}
        >
          &gt;
        </button>
      </div>
      <hr />
    </div>
  );
};

export default ExploreMenu;
