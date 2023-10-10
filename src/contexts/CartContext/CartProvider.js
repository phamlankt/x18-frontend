import React, { useState } from "react";
import cartContext from "./CartContext";
import transactionAPI from "../../apis/transaction";

const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [isPaid, setIsPaid] = useState(false);

  const addProduct = (product, saleOff = 0, quantity = 1) => {
    const existProduct = cart.find((el) => el.product._id === product._id);
    if (!existProduct) {
      setCart((pre) => [
        ...pre,
        {
          product,
          quantity: parseInt(quantity),
          saleOff,
        },
      ]);
    }
  };

  const clearCart = () => {
    setCart([]);
  };

  const changeQuantity = (product, quantity) => {
    if (parseInt(quantity) <= 0 || !quantity) {
      const termCart = cart.filter((el) => el.product._id !== product._id);
      return setCart(termCart);
    }

    let updateCart = [...cart];
    const productIndex = updateCart.findIndex(
      (el) => el.product._id === product._id
    );

    updateCart[productIndex] = {
      ...updateCart[productIndex],
      quantity: parseInt(quantity),
    };

    return setCart(updateCart);
  };

  const creatTransaction = async (data) => {
    const newValue = { ...data, status: 4 };
    const res = await transactionAPI.create(newValue);
    return res;
  };

  const updateTransaction = async (data) => {
    const newValue = { ...data, status: 1 };
    const res = await transactionAPI.update(newValue);
    return res;
  };

  return (
    <cartContext.Provider
      value={{
        cart,
        setCart,
        isPaid,
        setIsPaid,
        addProduct,
        changeQuantity,
        creatTransaction,
        updateTransaction,
        clearCart,
      }}
    >
      {children}
    </cartContext.Provider>
  );
};

export default CartProvider;
