import React, { useContext } from "react";
import "./Cart.css";
import { StoreContext } from "../../context/StoreContext";
import { API_BASE_URL } from "../../constants/API";
import { adminAssets } from "../../assets/admin/adminAssets";
import { useNavigate } from "react-router-dom";
import CartTotal from "../../components/CartTotal/CartTotal";

const Cart = () => {
  const { cartItems, setCartItems, GetTotalCartAmount } =
    useContext(StoreContext);
  const items = Object.entries(cartItems);
  const navigate = useNavigate();

  const cartTitle = [
    {
      name: "Items",
    },
    {
      name: "Title",
    },
    {
      name: "Price",
    },
    {
      name: "Quantity",
    },
    {
      name: "Total",
    },
    {
      name: "Remove",
    },
  ];

  const RemoveItem = (itemPair) => {
    setCartItems((prev) => ({
      ...prev,
      [itemPair[0]]: {
        details: itemPair[1].details,
        quantity: 0,
      },
    }));
  };

  return (
    <div className="cart">
      <div className="cart-items">
        <div className="cart-items-title">
          {cartTitle.map((title) => {
            return <p key={title.name}>{title.name}</p>;
          })}
        </div>
        <br />
        <hr />
        {items.map((itemPair, index) => {
          if (itemPair[1].quantity > 0) {
            return (
              <div key={index}>
                <div className="cart-items-title cart-items-item">
                  <img
                    src={`${API_BASE_URL}/images/food/${itemPair[1].details.image}`}
                    alt="item-image"
                  />
                  <p>{itemPair[1].details.name}</p>
                  <p>${itemPair[1].details.price}</p>
                  <p>{itemPair[1].quantity}</p>
                  <p>${itemPair[1].details.price * itemPair[1].quantity}</p>
                  <p className="cross">
                    <img
                      onClick={() => RemoveItem(itemPair)}
                      className="cursor"
                      src={adminAssets.cross_icon}
                      alt="remove item"
                    />
                  </p>
                </div>
                <hr />
              </div>
            );
          }
        })}
      </div>
      <div className="cart-bottom">
        <CartTotal
          GetTotalCartAmount={GetTotalCartAmount}
          btnText={"PROCEED TO CHECKOUT"}
          btnFunction={() => navigate("/order")}
        />
      </div>
    </div>
  );
};

export default Cart;
