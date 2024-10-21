import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useContext, useState, useRef, useEffect } from 'react';
import { toast } from 'react-toastify';
import useAdmin from '../Hooks/useAdmin';
import useModerator from '../Hooks/useModerator';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../providers/AuthProvider';
import {
  FaBell,
  FaSignOutAlt,
  FaUser,
  FaShoppingCart,
  FaHeart,
  FaListAlt,
  FaUsers,
  FaTachometerAlt,
  FaChartLine,
  FaShoppingBag,
  FaMoneyCheckAlt,
  FaEnvelope,
  FaHome,
  FaCartPlus,
  FaFirstOrderAlt,
  FaFirstOrder,
} from 'react-icons/fa';
import { AiOutlineMenuUnfold } from 'react-icons/ai';
import ProfilePopup from '../pages/Dashboard/Profile/ProfilePopup';
import logo from '../assets/Icons/bondonbdlogo.jpg';
import { Helmet } from 'react-helmet-async';

const Dashboard = () => {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const [isAdmin] = useAdmin();
  const [isModerator] = useModerator();

  useEffect(() => {
    if (isAdmin || isModerator) {
      navigate('/dashboard/panelboard');
    } else {
      navigate('/dashboard/myorder');
    }
  }, [isAdmin, isModerator, navigate]);

  const [toggle, setToggle] = useState(false);
  const mobileMenuRef = useRef(null);

  const [showPopup, setShowPopup] = useState(false);
  const popupRef = useRef(null);

  const [showProfile, setShowProfile] = useState(false);

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setToggle(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuRef]);

  const navOptions = (
    <>
      {isAdmin ? (
        <>
          <h4 className="font-semibold text-white">Menu</h4>
          <li>
            <NavLink
              to="/dashboard/panelboard"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaTachometerAlt className="mr-2" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/notAvailable"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaChartLine className="mr-2" /> Analytics
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/users"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaUsers className="mr-2" /> Users
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/sales"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaShoppingBag className="mr-2" /> Sales
            </NavLink>
          </li>
          <h4 className="font-semibold my-3 text-white">Management</h4>
          <li>
            <NavLink
              to="/dashboard/products"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaShoppingCart className="mr-2" /> Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/orders"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaFirstOrder className="mr-2" /> Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/customers"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaUsers className="mr-2" /> Customers
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/banners"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaListAlt className="mr-2" /> Banners
            </NavLink>
          </li>
          <h4 className="font-semibold my-3 text-white">Notifications</h4>
          <li>
            <NavLink
              to="/dashboard/notAvailable"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaMoneyCheckAlt className="mr-2" /> Transactions
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/notAvailable"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaEnvelope className="mr-2" /> Messages
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/notAvailable"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaListAlt className="mr-2" /> Reviews
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/notAvailable"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaListAlt className="mr-2" /> Reports
            </NavLink>
          </li>
        </>
      ) : isModerator ? (
        <>
          <h4 className="font-semibold text-white">Menu</h4>
          <li>
            <NavLink
              to="/dashboard/panelboard"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaTachometerAlt className="mr-2" /> Dashboard
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/notAvailable"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaChartLine className="mr-2" /> Analytics
            </NavLink>
          </li>
          <h4 className="font-semibold my-3 text-white">Management</h4>
          <li>
            <NavLink
              to="/dashboard/products"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaShoppingCart className="mr-2" /> Products
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/orders"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaFirstOrder className="mr-2" /> Orders
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/banners"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaListAlt className="mr-2" /> Banners
            </NavLink>
          </li>
          <h4 className="font-semibold my-3 text-white">Notifications</h4>
          <li>
            <NavLink
              to="/dashboard/notAvailable"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaEnvelope className="mr-2" /> Messages
            </NavLink>
          </li>
        </>
      ) : (
        <>
          <h4 className="font-semibold text-white">Menu</h4>
          <li>
            <NavLink
              to="/dashboard/myOrder"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaListAlt className="mr-2" /> My Order
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/cart"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaCartPlus className="mr-2" /> My Cart
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/wishlist"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaHeart className="mr-2" /> Wishlist
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/dashboard/notAvailable"
              className="hover:text-[#ff5a00] flex items-center"
            >
              <FaListAlt className="mr-2" /> Address
            </NavLink>
          </li>
        </>
      )}
    </>
  );

  const togglePopup = () => {
    setShowPopup(prev => !prev);
  };

  const handleLogOut = async () => {
    try {
      await logout();
      toast.success('You have been logged out successfully.');
      navigate('/');
    } catch (error) {
      console.error('Error logging out:', error);
      toast.error('There was an error logging out. Please try again.');
    }
  };

  // Outside click detection for popup close
  const handleClickOutside = event => {
    if (popupRef.current && !popupRef.current.contains(event.target)) {
      setShowPopup(false);
    }
  };

  // Effect to handle outside clicks
  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <div className="min-h-screen flex">
      <Helmet>
        <title>Bondon BD | Dashboard</title>
      </Helmet>
      {/* Sidebar */}
      <div className="sticky top-0 left-0 bottom-0 w-64 hidden bg-[#15161d] h-screen z-30 text-white lg:flex flex-col justify-between">
        <div className="px-7">
          <Link to="/">
            <img src={logo} className="my-6 w-full h-16" alt="Logo" />
          </Link>

          <ul className="dashboard overflow-auto text-slate-200">
            {navOptions}
          </ul>
        </div>

        {/* Home Button */}
        <NavLink to="/">
          <button className="bg-[#ff5a00] hover:bg-orange-600 flex items-center justify-start text-slate-50 py-3.5 px-7 w-full transition-all">
            <FaHome className="mr-2" /> Home
          </button>
        </NavLink>
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col z-20 w-full">
        {/* TopBar */}
        <div class="topbar">
          <div className="sticky w-full h-16 top-0 bg-white shadow-md py-2 px-[1rem] flex justify-between lg:justify-end items-center">
            <div
              className="text-3xl lg:hidden hover:text-[#ff5a00] transition-all hover:bg-slate-100 pl-0.5 rounded-full"
              onClick={() => setToggle(!toggle)}
            >
              <AiOutlineMenuUnfold />
            </div>
            <div
              className={`mobile-menu ${
                toggle ? 'open' : ''
              } fixed bg-[#15161d] text-white flex flex-col justify-between top-0 left-0 w-64 h-screen z-30 overflow-hidden`}
              ref={mobileMenuRef}
            >
              <div className="px-7">
                <Link
                  to="/"
                  className="w-full text-center"
                  onClick={() => setToggle(false)}
                >
                  <img src={logo} className="my-6 w-full h-16" alt="Logo" />
                </Link>
                <ul
                  className="dashboard overflow-auto text-slate-200"
                  onClick={() => setToggle(false)}
                >
                  {navOptions}
                </ul>
              </div>

              {/* Home Button */}
              <Link to="/">
                <button className="bg-[#ff5a00] hover:bg-orange-600 flex items-center justify-start text-slate-50 py-3.5 px-7 w-full transition-all">
                  <FaHome className="mr-2" /> Home
                </button>
              </Link>
            </div>
            <div className="flex justify-end items-center space-x-4">
              <div className="relative inline-block">
                <button className="p-2.5 rounded-full bg-gray-200 hover:bg-gray-300">
                  <FaBell className="text-gray-600" />
                </button>
                <span className="absolute top-0 right-0 inline-flex items-center justify-center p-1 px-1.5 text-xs font-semibold leading-none text-white bg-orange-500 rounded-full">
                  0
                </span>
              </div>

              {/* User Profile */}
              <div className="relative">
                <button
                  onClick={togglePopup}
                  className="flex items-center space-x-3 focus:outline-none"
                >
                  <img
                    src={user?.photoURL || '/default-profile.png'}
                    alt="Profile Picture"
                    className="w-10 h-10 rounded-full"
                  />
                  <div className="text-start">
                    <h3 className="text-gray-800 font-semibold">
                      {user?.displayName || 'User'}
                    </h3>
                    <p className="text-gray-500 text-sm flex items-center justify-between">
                      {isAdmin ? 'Admin' : isModerator ? 'Moderator' : 'User'}
                      <span className="float-right text-[#ff5a00] text-lg">
                        &#9662;
                      </span>
                    </p>
                  </div>
                </button>

                {/* Popup */}
                {showPopup && (
                  <div
                    ref={popupRef}
                    className="absolute right-0 mt-2 bg-white border rounded-lg shadow-lg w-48"
                  >
                    <ul className="dashboard">
                      <li>
                        <button
                          onClick={() => setShowProfile(true)}
                          className="w-full text-left p-2 hover:bg-gray-100 flex items-center space-x-2"
                        >
                          <FaUser />
                          <span>View Profile</span>
                        </button>
                      </li>

                      {/* Display ProfilePopup when showPopup is true */}
                      {showProfile && (
                        <ProfilePopup
                          user={user}
                          onClose={() => setShowProfile(false)}
                        />
                      )}

                      <li>
                        <button
                          onClick={handleLogOut}
                          className="w-full text-left p-2 hover:bg-gray-100 flex items-center space-x-2 text-[#ff5a00]"
                        >
                          <FaSignOutAlt />
                          <span>Log Out</span>
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Page Content */}
        <div className="flex-1 h-screen mt-14 ">
          <Outlet />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
