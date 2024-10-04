import React from "react";
import "./CartTotal.css";

const CartTotal = ({ GetTotalCartAmount, btnText, btnFunction }) => {
  return (
    <div className="cart-total">
      <h2>Cart Totals</h2>
      <div>
        <div className="cart-total-details">
          <p>Subtotal</p>
          <p>${GetTotalCartAmount()}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <p>Delivery Fee</p>
          <p>${GetTotalCartAmount() === 0 ? 0 : 2}</p>
        </div>
        <hr />
        <div className="cart-total-details">
          <b>Total</b>
          <b>${GetTotalCartAmount() === 0 ? 0 : GetTotalCartAmount() + 2}</b>
        </div>
      </div>
      <button onClick={btnFunction}>{btnText}</button>
    </div>
  );
};

export default CartTotal;
