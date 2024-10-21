
import React, { createContext, useReducer, useEffect } from 'react';
import CartReducer from './CartReducer';
import WishlistReducer from './WishlistReducer';

export const CartContext = createContext();
export const WishlistContext = createContext();

const initialCartState = JSON.parse(localStorage.getItem('cart')) || [];
const initialWishlistState = JSON.parse(localStorage.getItem('wishlist')) || [];

const ContextProvider = ({ children }) => {
  const [cart, cartDispatch] = useReducer(CartReducer, initialCartState);
  const [wishlist, wishlistDispatch] = useReducer(
    WishlistReducer,
    initialWishlistState
  );

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  useEffect(() => {
    localStorage.setItem('wishlist', JSON.stringify(wishlist));
  }, [wishlist]);

  return (
    <CartContext.Provider value={{ cart, cartDispatch }}>
      <WishlistContext.Provider value={{ wishlist, wishlistDispatch }}>
        {children}
      </WishlistContext.Provider>
    </CartContext.Provider>
  );
};

export default ContextProvider;
