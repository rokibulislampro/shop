import React, { useContext } from 'react';
import { CartContext } from '../../../Features/ContextProvider';
import { totalItem, totalPrice } from '../../../Features/CartReducer';
import emptyCart from '../../../assets/Icons/shopping_cart_warning.svg';
import { Link } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import './Cart.css';

const Cart = () => {
  const { cart, cartDispatch } = useContext(CartContext);

  const hasProducts = cart.length > 0;

  const Increase = id => {
    cartDispatch({ type: 'Increase', id });
  };

  const Decrease = id => {
    cartDispatch({ type: 'Decrease', id });
  };

  const Remove = id => {
    cartDispatch({ type: 'Remove', id });
  };

  return (
    <section>
      <Helmet>
        <title>Bondon BD | Cart</title>
      </Helmet>
      <div className="m-[1rem] xl:mx-[10rem] my-10">
        {!hasProducts && (
          <div className="flex flex-col justify-center items-center">
            <img src={emptyCart} className="w-40" alt="Empty Cart" />
            <h2 className="text-3xl font-semibold my-4">
              Your Cart is <span className="text-[#ff5a00]">Empty!</span>
            </h2>
            <p className="text-center font-semibold mb-3">
              Must add items to the cart before you proceed to checkout.
            </p>
            <Link to="/shop">
              <button className="w-fit text-white text-sm font-semibold px-8 py-2 bg-[#ff5a00] rounded-full">
                Return To Shop
              </button>
            </Link>
          </div>
        )}
        {hasProducts && (
          <div className="md:flex gap-4">
            <div className="w-full md:w-2/3">
              <h2 className="text-2xl mb-4 text-[#ff5a00] font-semibold">
                Your Cart
              </h2>
              <table className="w-full">
                <thead>
                  <tr className="flex justify-between">
                    <th className="w-1/3 py-3 px-6 text-left">Product</th>
                    <th className="w-1/6 py-3 px-2 md:px-6 text-center">
                      Price
                    </th>
                    <th className="w-1/6 py-3 px-2 md:px-6 text-center">
                      Quantity
                    </th>
                    <th className="w-1/6 py-3 px-2 md:px-6 text-right">
                      Subtotal
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map(product => (
                    <tr
                      key={product.id}
                      className="flex justify-between items-center gap-3"
                    >
                      <td className="flex w-1/3 gap-1.5 md:gap-5 items-center justify-start">
                        <img
                          src={product.image}
                          alt="Product"
                          className="w-12 md:w-16 h-12 md:h-16 object-cover rounded-sm"
                        />
                        <p className="text-sm text-[#ff5a00]">{product.name}</p>
                      </td>
                      <td className="w-1/6 text-sm text-center">
                        ৳{' '}
                        {product.discountPrice > 0
                          ? product.discountPrice
                          : product.price}
                      </td>
                      <td className="w-1/6 flex justify-center items-center">
                        <button
                          className="bg-slate-100 hover:bg-[#ff5a00] hover:text-white transition-all w-[30px] h-[30px] md:w-[35px] md:h-[35px] font-bold text-xl rounded-full"
                          onClick={() => Decrease(product.id)}
                        >
                          -
                        </button>
                        <span className="px-2">{product.quantity}</span>
                        <button
                          className="bg-slate-100 hover:bg-[#ff5a00] hover:text-white transition-all w-[30px] h-[30px] md:w-[35px] md:h-[35px] font-bold text-xl rounded-full"
                          onClick={() => Increase(product.id)}
                        >
                          +
                        </button>
                      </td>
                      <td className="w-1/6 flex items-center justify-end gap-2">
                        <p className="text-sm flex">
                          ৳{' '}
                          {product.quantity *
                            (product.discountPrice > 0
                              ? product.discountPrice
                              : product.price)}
                        </p>
                        <button
                          className="text-gray-700 bg-slate-300 rounded-full px-1.5 ml-2 hover:text-black text-xl font-semibold"
                          onClick={() => Remove(product.id)}
                        >
                          ×
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="w-full md:w-1/3 h-fit mt-10 border p-5 rounded-lg border-[#ff5a00]">
              <h2 className="text-xl font-semibold">Cart totals</h2>
              <hr className="my-3" />
              <div className="flex justify-between">
                <p className="font-semibold">Total Items</p>
                <p className="text-lg font-bold">{totalItem(cart)}</p>
              </div>
              <hr className="my-3" />
              <div className="flex justify-between">
                <p className="font-semibold">Grand Total</p>
                <p className="text-lg font-bold">
                  <span className="text-xl font-extrabold">৳ </span>
                  {totalPrice(cart)}
                </p>
              </div>
              <hr className="my-3" />
              <Link to="/Checkout">
                <button className="text-center text-sm w-full h-10 rounded-full bg-[#ff5a00] hover:bg-[#1e1f29] text-white font-semibold mt-2 transition-all">
                  Proceed to Checkout
                </button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Cart;
