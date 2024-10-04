import React, { useState } from "react";
import "./FoodDisplay.css";
import FoodCard from "../FoodCard/FoodCard";
import Pagination from "../Pagination/Pagination";
import { toast } from "react-toastify";
import { useFetch } from "../../hooks/useFetch";

const FoodDisplay = ({ category }) => {
  const limit = 8;
  const [currentPage, setCurrentPage] = useState(1);
  const { list, total, error, loading } = useFetch(
    "food",
    [
      {
        key: "page",
        value: currentPage,
      },
      {
        key: "limit",
        value: limit,
      },
      {
        key: "category",
        value: category,
      },
    ],
    25000
  );

  if (error) {
    toast.error(error);
  }

  return (
    <div className="food-display" id="food-display">
      <h2>Top dishes near you</h2>
      <div style={{ marginBottom: "25px" }} className="food-display-list">
        {loading ? (
          <p>loading...</p>
        ) : (
          <>
            {list.map((item, index) => {
              return <FoodCard key={index} item={item} />;
            })}
          </>
        )}
      </div>
      {category === "All" && (
        <Pagination
          total={total}
          limit={limit}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
        />
      )}
    </div>
  );
};

export default FoodDisplay;
