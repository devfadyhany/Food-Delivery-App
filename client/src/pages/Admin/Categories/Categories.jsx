import React, { useState } from "react";
import "./Categories.css";
import axios from "axios";
import { toast } from "react-toastify";
import { adminAssets } from "../../../assets/admin/adminAssets";
import Pagination from "../../../components/Pagination/Pagination";
import { API_BASE_URL } from "../../../constants/API";
import { useFetch } from "../../../hooks/useFetch";

const Categories = () => {
  const limit = 6;
  const [currentPage, setCurrentPage] = useState(1);
  const { list, total, error, loading, refresh } = useFetch(
    "category",
    [
      {
        key: "page",
        value: currentPage,
      },
      {
        key: "limit",
        value: limit,
      },
    ],
    10000
  );

  if (error) {
    toast.error(error);
  }

  const HandleDelete = async (id) => {
    try {
      const response = await axios.delete(`${API_BASE_URL}/category/${id}`);

      if (response.status === 200) {
        toast.success(response.data.message);
        refresh();
      }
    } catch (error) {
      toast.error(error.response.data.message);
    }
  };

  return (
    <div className="list add flex-col">
      <p>All Categories List</p>
      {loading ? (
        <p style={{ textAlign: "center" }}>loading...</p>
      ) : (
        <>
          {list ? (
            <>
              <div className="list-table">
                <div className="list-table-format category-table-format title">
                  <b>Image</b>
                  <b>Name</b>
                  <b>Action</b>
                </div>
                {list.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="list-table-format category-table-format"
                    >
                      <img
                        src={`${API_BASE_URL}/images/category/${item.image}`}
                        alt=""
                      />
                      <p>{item.name}</p>
                      <p className="action">
                        <img
                          onClick={() => HandleDelete(item._id)}
                          className="cursor"
                          src={adminAssets.cross_icon}
                          alt=""
                        />
                      </p>
                    </div>
                  );
                })}
              </div>
              <Pagination
                total={total}
                limit={limit}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            </>
          ) : (
            <p style={{ textAlign: "center" }}>No Categories Found.</p>
          )}
        </>
      )}
    </div>
  );
};

export default Categories;
