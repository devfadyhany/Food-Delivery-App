import React, { useContext, useState } from "react";
import "./PlaceOrder.css";
import { StoreContext } from "../../context/StoreContext";
import CartTotal from "../../components/CartTotal/CartTotal";
import axios from "axios";
import { API_BASE_URL } from "../../constants/API";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthContext";

const PlaceOrder = () => {
  const navigate = useNavigate();

  const { currentUser } = useContext(AuthContext);
  const { cartItems, GetTotalCartAmount } = useContext(StoreContext);
  const [data, setData] = useState({
    first_name: "",
    last_name: "",
    email: "",
    phone: "",
    street: "",
    city: "",
    floor_number: "",
  });

  const ChangeHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;

    setData((prev) => ({ ...prev, [name]: value }));
  };

  const CreatePaymentLink = async (e) => {
    e.preventDefault();

    const items = Object.keys(cartItems).map((key) => ({
      id: key,
      name: cartItems[key].details.name,
      description: cartItems[key].details.description,
      category: cartItems[key].details.category,
      price: cartItems[key].details.price,
      image: cartItems[key].details.image,
      quantity: cartItems[key].quantity,
    }));

    try {
      const response = await axios.post(
        `${API_BASE_URL}/order/create-payment-link`,
        {
          user_id: currentUser.id,
          items: items,
          amount: GetTotalCartAmount() + 2,
          first_name: data.first_name,
          last_name: data.last_name,
          email: data.email,
          phone: data.phone,
          street: data.street,
          city: data.city,
          floor_number: data.floor_number,
        }
      );

      console.log(response);

      return navigate(`/payment?frame=${response.data.url}`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <form onSubmit={CreatePaymentLink} className="place-order">
      <div className="place-order-left">
        <p className="title">Delivery Information</p>
        <div className="multi-fields">
          <input
            onChange={ChangeHandler}
            value={data.first_name}
            name="first_name"
            type="text"
            placeholder="First Name"
          />
          <input
            onChange={ChangeHandler}
            value={data.last_name}
            name="last_name"
            type="text"
            placeholder="Last Name"
          />
        </div>
        <input
          onChange={ChangeHandler}
          value={data.email}
          name="email"
          type="text"
          placeholder="E-mail"
        />
        <input
          onChange={ChangeHandler}
          value={data.phone}
          name="phone"
          type="text"
          placeholder="Phone"
        />
        <input
          onChange={ChangeHandler}
          value={data.street}
          name="street"
          type="text"
          placeholder="Street"
        />
        <div className="multi-fields">
          <input
            onChange={ChangeHandler}
            value={data.city}
            name="city"
            type="text"
            placeholder="City"
          />
          <input
            onChange={ChangeHandler}
            value={data.floor_number}
            name="floor_number"
            type="number"
            placeholder="Floor No."
          />
        </div>
      </div>
      <div className="place-order-right">
        <CartTotal
          GetTotalCartAmount={GetTotalCartAmount}
          btnText={"PROCEED TO PAYMENT"}
          // btnFunction={CreatePaymentLink}
        />
      </div>
    </form>
  );
};

export default PlaceOrder;
