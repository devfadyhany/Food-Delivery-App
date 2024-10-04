import { createContext, useState } from "react";

export const StoreContext = createContext(null);

const StoreContextProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState({});

  const AddToCart = (item) => {
    const { _id, ...details } = item;

    if (!cartItems[item._id]) {
      setCartItems((prev) => ({
        ...prev,
        [item._id]: { details, quantity: 1 },
      }));
    } else {
      setCartItems((prev) => ({
        ...prev,
        [item._id]: { details, quantity: prev[item._id].quantity + 1 },
      }));
    }
  };

  const RemoveFromCart = (item) => {
    const { _id, ...details } = item;

    setCartItems((prev) => ({
      ...prev,
      [item._id]: { details, quantity: prev[item._id].quantity - 1 },
    }));
  };

  const GetTotalCartAmount = () => {
    let totalAmount = 0;
    for (const item of Object.entries(cartItems)) {
      if (cartItems[item[0]]) {
        if (cartItems[item[0]].quantity > 0) {
          totalAmount +=
            cartItems[item[0]].details.price * cartItems[item[0]].quantity;
        }
      }
    }

    return totalAmount;
  };

  const contextValue = {
    cartItems,
    setCartItems,
    AddToCart,
    RemoveFromCart,
    GetTotalCartAmount,
  };

  return (
    <StoreContext.Provider value={contextValue}>
      {children}
    </StoreContext.Provider>
  );
};
export default StoreContextProvider;
