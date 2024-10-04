import React, { useContext } from "react";
import { useFetch } from "../../hooks/useFetch";
import { AuthContext } from "../../context/AuthContext";
import { assets } from "../../assets/assets";

import "./MyOrders.css";
import { toast } from "react-toastify";

const MyOrders = () => {
  const { currentUser } = useContext(AuthContext);
  const { list, error, loading, refresh } = useFetch(
    `order/user/${currentUser.id}`,
    [],
    0
  );

  if (error) {
    toast.error(error);
  }

  return (
    <div className="my-orders">
      <h2>My Orders</h2>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <>
          <div className="container">
            {list.map((order, index) => {
              return (
                <div key={index} className="my-orders-order">
                  <img src={assets.parcel_icon} alt="" />
                  <p>
                    {order.items.map((item, index) => {
                      if (index === order.items.length - 1) {
                        return item.name + " x " + item.quantity;
                      } else {
                        return item.name + " x " + item.quantity + ", ";
                      }
                    })}
                  </p>
                  <p>${order.amount}.00</p>
                  <p>Items: {order.items.length}</p>
                  <p>
                    <span>&#x25cf;</span> <b>{order.status}</b>
                  </p>
                  <button onClick={refresh}>Track Order</button>
                </div>
              );
            })}
          </div>
        </>
      )}
    </div>
  );
};

export default MyOrders;
