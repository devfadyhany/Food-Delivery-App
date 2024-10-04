import React from "react";
import "./Orders.css";
import { toast } from "react-toastify";
import { adminAssets } from "../../../assets/admin/adminAssets";
import { useFetch } from "../../../hooks/useFetch";
import axios from "axios";
import { API_BASE_URL } from "../../../constants/API";

const Orders = () => {
  const { list, error, loading, refresh } = useFetch(
    `order`,
    [
      {
        key: "limit",
        value: 1000,
      },
      {
        key: "page",
        value: 1,
      },
    ],
    0
  );

  if (error) {
    toast.error(error);
  }

  const StatusHandler = async (e, orderId) => {
    try {
      const response = await axios.put(`${API_BASE_URL}/order/${orderId}`, {
        status: e.target.value,
      });

      toast.success(response.data.message);
      refresh();
    } catch (err) {
      toast.error(err.response.data.message);
    }
  };

  return (
    <div className="order">
      <h3>Order Page</h3>
      <div className="order-list">
        {list.map((order, index) => {
          return (
            <div key={index} className="order-item">
              <img src={adminAssets.parcel_icon} alt="" />
              <div>
                <p className="order-item-food">
                  {order.items.map((item, index) => {
                    if (index === order.items.length - 1) {
                      return item.name + " x " + item.quantity;
                    } else {
                      return item.name + " x " + item.quantity + ", ";
                    }
                  })}
                </p>
                <p className="order-item-name">
                  {order.first_name + " " + order.last_name}
                </p>
                <div className="order-item-address">
                  <p>{order.street + ","}</p>
                  <p>{order.city + ", Egypt"}</p>
                  <p>Floor No: {order.floor_number + ","}</p>
                </div>
                <p className="order-item-phone">{order.phone}</p>
              </div>
              <p>Items: {order.items.length}</p>
              <p>${order.amount}</p>
              <select
                value={order.status}
                onChange={(e) => StatusHandler(e, order._id)}
              >
                <option value="in-processing">in-processing</option>
                <option value="out-for-delivery">out-for-delivery</option>
                <option value="delivered">delivered</option>
              </select>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Orders;
