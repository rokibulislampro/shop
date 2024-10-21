import React, { useContext, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../../providers/AuthProvider';
import './Navbar.css';
import wishList from '../../../assets/Icons/love.png';
import addToCart from '../../../assets/Icons/shopping-cart.png';
import shoppingBag from '../../../assets/Icons/bag.png';
import logo from '../../../assets/Icons/logos.mp4';
import {
  CartContext,
  WishlistContext,
} from '../../../Features/ContextProvider';
import { totalItem, totalPrice } from '../../../Features/CartReducer';
import CartModal from '../CartModal/CartModal';
import {
  AiOutlineEnvironment,
  AiOutlineLogin,
  AiOutlineMail,
  AiOutlinePhone,
} from 'react-icons/ai';
import {
  FaDollarSign,
  FaHeart,
  FaMoneyBill,
  FaShoppingCart,
  FaTractor,
  FaUser,
} from 'react-icons/fa';
import Search from './Search';
import TrackingModal from './TrackingModal';

const TopBar = () => {
  const { user } = useContext(AuthContext);
  const [isModalOpen, setModalOpen] = useState(false);
  const [isTrackingModalOpen, setTrackingModalOpen] = useState(false); // State for tracking modal
  const { cart } = useContext(CartContext);
  const { wishlist } = useContext(WishlistContext);
  const [currency, setCurrency] = useState('BDT');

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(position => {
        const { latitude, longitude } = position.coords;
        if (
          latitude >= 20 &&
          latitude <= 27 &&
          longitude >= 88 &&
          longitude <= 93
        ) {
          setCurrency('BDT');
        } else {
          setCurrency('USD');
        }
      });
    }
  }, []);

  const handleOpenModal = () => {
    setModalOpen(true);
  };

  const handleCloseModal = () => {
    setModalOpen(false);
  };

  // Handlers for order tracking modal
  const handleOpenTrackingModal = () => {
    setTrackingModalOpen(true);
  };

  const handleCloseTrackingModal = () => {
    setTrackingModalOpen(false);
  };

  return (
    <section className="text-sm">
      <div className="flex justify-between items-center px-[0.5rem] xl:px-[10rem] text-center w-full bg-[#ff5a00] shadow py-2">
        <div className="flex flex-wrap items-center space-x-3 font-semibold text-xs text-white">
          <div className="flex items-center hover:text-orange-100 transition-all">
            <AiOutlinePhone className="mr-2 text-[#ffffff]" /> 09638041547
          </div>
          <div className="flex items-center hover:text-orange-100 transition-all">
            <AiOutlineMail className="mr-2 text-[#ffffff]" />{' '}
            bondonbd61@gmail.com
          </div>
          <div className="flex items-center hover:text-orange-100 transition-all">
            <AiOutlineEnvironment className="mr-2 text-[#ffffff]" /> 2000 -
            Jamalpur, Mymensingh
          </div>
          <div
            className="flex items-center hover:text-orange-100 transition-all"
            onClick={handleOpenTrackingModal}
          >
            <FaTractor className="mr-2 text-[#ffffff]" /> Order Tracking
          </div>
        </div>
        {/* Tracking Modal */}
        <TrackingModal
          isOpen={isTrackingModalOpen}
          onClose={handleCloseTrackingModal}
        />
        <div className="md:flex items-center gap-3 font-semibold text-xs text-white">
          <div className="flex items-center">
            <span className="flex items-center hover:text-orange-100 transition-all">
              {currency === 'USD' ? (
                <>
                  <FaDollarSign className="mr-2 text-[#ffffff]" /> USD
                </>
              ) : (
                <>
                  <FaMoneyBill className="mr-2 text-[#ffffff] text-lg" /> BDT
                </>
              )}
            </span>
          </div>
          <div className="flex items-center">
            {user ? (
              <>
                <Link
                  to="/Dashboard"
                  className="flex items-center hover:text-orange-100 transition-all"
                >
                  <FaUser className="mr-2 text-[#ffffff]" /> ACCOUNT
                </Link>
              </>
            ) : (
              <Link
                to="/Login"
                className="flex items-center hover:text-orange-100 transition-all"
              >
                <AiOutlineLogin className="mr-2 text-[#ffffff] text-lg" /> LOGIN
              </Link>
            )}
          </div>
        </div>
      </div>
      <div className="md:flex justify-between items-center px-[0.5rem] xl:px-[10rem] w-full bg-[#ffffff] py-1.5 border-b-[3px] border-[#ff5a00]">
        <div className="flex justify-between items-center py-1.5">
          <a
            className="text-2xl lg:text-4xl text-left font-bold text-[#ff5a00] w-full md:w-auto"
            href="/"
          >
            <video src={logo} autoPlay loop muted className="w-[5rem]"></video>
          </a>
          <div className="flex md:hidden text-white font-semibold space-x-5">
            <Link
              to="/Wishlist"
              className="w-full flex flex-col justify-center items-center text-center"
            >
              <div className="relative" style={{ width: '1.8rem' }}>
                <FaHeart
                  className="cursor-pointer text-2xl text-[#ff5a00]"
                  style={{ width: '100%' }}
                />
                <span className="badge-count font-semibold">
                  {wishlist.length}
                </span>
              </div>
            </Link>

            <div
              className="w-full flex flex-col justify-center items-center text-center"
              onClick={handleOpenModal}
            >
              <div className="relative" style={{ width: '1.8rem' }}>
                <FaShoppingCart
                  className="cursor-pointer text-2xl text-[#ff5a00]"
                  style={{ width: '100%' }}
                />
                <span className="badge-count font-semibold">
                  {totalItem(cart)}
                </span>
              </div>
            </div>
          </div>
        </div>
        <Search></Search>
        <div className="md:flex hidden  text-white space-x-3">
          <Link
            to="/Wishlist"
            className="w-full flex flex-col justify-center items-center text-center"
          >
            <div className="relative" style={{ width: '1.8rem' }}>
              <FaHeart
                className="cursor-pointer text-2xl text-[#ff5a00]"
                style={{ width: '100%' }}
              />
              <span className="badge-count font-semibold">
                {wishlist.length}
              </span>
            </div>
            <p className="text-[#ff5a00] text-sm mt-2 flex items-center gap-1">
              <span>Your</span>
              <span>Wishlist</span>
            </p>
          </Link>

          <div
            className="w-full flex flex-col justify-center items-center text-center"
            onClick={handleOpenModal}
          >
            <div
              className="relative text-[#ff5a00]"
              style={{ width: '1.8rem' }}
            >
              <FaShoppingCart
                className="cursor-pointer text-2xl"
                style={{ width: '100%' }}
              />
              <span className="badge-count font-semibold">
                {totalItem(cart)}
              </span>
            </div>
            <p className="text-[#ff5a00] mt-2 flex items-center gap-1">
              <span>Your</span>
              <span>Cart</span>
            </p>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <div className="fixed inset-0 flex justify-end z-50">
          <div
            className="fixed inset-0 bg-black opacity-50"
            onClick={handleCloseModal}
          ></div>
          <div className="w-2/3 sm:w-1/2 lg:w-1/4 h-full bg-white shadow-lg p-4 overflow-y-auto transform transition-transform duration-300 slide-in-from-right">
            <button
              type="button"
              className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
              onClick={handleCloseModal}
            >
              ✕
            </button>
            <h3 className="font-semibold text-xl">Shopping Cart</h3>
            <hr style={{ marginTop: '2px' }} />
            <div className="w-full">
              {cart.length === 0 ? (
                <div className="flex flex-col items-center justify-center mt-10">
                  <div className="bg-slate-200 p-2 rounded-full overflow-hidden">
                    <img
                      className="w-12 translate-y-3"
                      src={shoppingBag}
                      alt=""
                    />
                  </div>
                  <p className="py-4 text-sm font-semibold text-center">
                    No products in the Cart
                  </p>
                </div>
              ) : (
                <div className="relative">
                  {/*Scrollable product list */}
                  <div className="overflow-y-auto max-h-[32rem] p-2">
                    {cart.map(product => (
                      <CartModal key={product.id} product={product} />
                    ))}
                  </div>
                  {/* Total and Buttons section */}
                  <div
                    className="fixed bottom-0 left-0 w-full bg-white shadow-md p-4"
                    style={{ zIndex: 1000 }}
                  >
                    <div className="flex justify-between mb-2">
                      <p className="font-semibold">Subtotal</p>
                      <p className="text-md font-bold">
                        <span className="font-extrabold">৳ </span>
                        {totalPrice(cart)}
                      </p>
                    </div>
                    <div>
                      <Link to="/Cart">
                        <button
                          className="text-center w-full h-10 rounded-full border border-[#ff5a00] text-[#ff5a00] hover:text-white hover:border-none hover:bg-[#1e1f29] transition-all font-semibold mt-2"
                          onClick={handleCloseModal}
                        >
                          View Cart
                        </button>
                      </Link>
                      <Link to="/Checkout">
                        <button
                          className="text-center w-full h-10 rounded-full bg-[#ff5a00] text-white font-semibold mt-2"
                          onClick={handleCloseModal}
                        >
                          Checkout
                        </button>
                      </Link>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
};

export default TopBar;
