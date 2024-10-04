import React, { useEffect, useState } from "react";
import "./Pagination.css";

const Pagination = ({ total, limit, currentPage, setCurrentPage }) => {
  const [pages, setPages] = useState([]);

  useEffect(() => {
    setPages([]);

    for (let i = 0; i < Math.ceil(total / limit); i++) {
      setPages((prev) => [...prev, i + 1]);
    }
  }, [total]);

  return (
    <ul className="pagination">
      {pages.map((page, index) => {
        return (
          <li
            className={currentPage == page ? "active" : ""}
            key={index}
            onClick={() => setCurrentPage(page)}
          >
            {page}
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
