import React, { useContext } from "react";
import "./FoodCard.css";
import { assets } from "../../assets/assets";
import { StoreContext } from "../../context/StoreContext";
import { API_BASE_URL } from "../../constants/API";
import { AuthContext } from "../../context/AuthContext";

const FoodCard = ({ item }) => {
  const { currentUser } = useContext(AuthContext);
  const { cartItems, AddToCart, RemoveFromCart } = useContext(StoreContext);

  return (
    <div className="food-item">
      <div className="food-item-img-container">
        <img
          className="food-item-img"
          src={`${API_BASE_URL}/images/food/${item.image}`}
          alt="food-image"
        />
        {currentUser && (
          <>
            {!cartItems[item._id] || cartItems[item._id].quantity === 0 ? (
              <img
                className="add"
                onClick={() => AddToCart(item)}
                src={assets.add_icon_white}
                alt="increase-count"
              />
            ) : (
              <div className="food-item-counter">
                <img
                  onClick={() => RemoveFromCart(item)}
                  src={assets.remove_icon_red}
                  alt="decrease-count"
                />
                <p>{cartItems[item._id].quantity}</p>
                <img
                  onClick={() => AddToCart(item)}
                  src={assets.add_icon_green}
                  alt="increase-count"
                />
              </div>
            )}
          </>
        )}
      </div>
      <div className="food-item-info">
        <div className="food-item-name-rating">
          <p>{item.name}</p>
        </div>
        <p className="food-item-desc">{item.description}</p>
        <p className="food-item-price">${item.price}</p>
      </div>
    </div>
  );
};

export default FoodCard;
