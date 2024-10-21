import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import TopBar from './TopBar';
import logo from '../../../assets/Icons/bondonbdlogo.jpg';

const Navbar = () => {
  const [toggle, setToggle] = useState(false);
  const [categories, setCategories] = useState([]);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [products, setProducts] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isProductModalOpen, setIsProductModalOpen] = useState(false);
  const [closeTimeout, setCloseTimeout] = useState(null);

  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();
  const categoryRef = useRef(null);
  const productModalRef = useRef(null);
  const mobileMenuRef = useRef(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosSecure.get('/product');
        const productsData = response.data;

        setProducts(productsData);

        const uniqueCategories = [
          ...new Set(productsData.map(product => product.category)),
        ];
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching products:', error);
      }
    };

    fetchProducts();
  }, [axiosSecure]);

  const handleCategoryHover = category => {
    if (closeTimeout) clearTimeout(closeTimeout);
    setSelectedCategory(category);
    setIsProductModalOpen(true);
  };

  const handleMouseLeave = () => {
    const timeout = setTimeout(() => {
      setIsProductModalOpen(false);
      setSelectedCategory(null);
    }, 3000);
    setCloseTimeout(timeout);
  };

  const handleMouseEnterProductModal = () => {
    if (closeTimeout) clearTimeout(closeTimeout);
  };

  const handleProductModalLeave = () => {
    setIsProductModalOpen(false);
    setSelectedCategory(null);
  };

  const handleProductClick = productId => {
    navigate(`/product/${productId}`);
    setIsCategoryOpen(false);
    setIsProductModalOpen(false);
  };

  const handleCategoryButtonClick = () => {
    setIsCategoryOpen(!isCategoryOpen);
    setIsProductModalOpen(false);
    setSelectedCategory(null);
  };

  useEffect(() => {
    const handleClickOutside = event => {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target)
      ) {
        setToggle(false);
      }

      if (
        categoryRef.current &&
        !categoryRef.current.contains(event.target) &&
        !productModalRef.current.contains(event.target) // Ensure product modal is also checked
      ) {
        setIsCategoryOpen(false);
        setIsProductModalOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [mobileMenuRef, categoryRef, productModalRef]);

  const navOptions = (
    <>
      <li>
        <Link to="/" exact>
          Home
        </Link>
      </li>
      <li>
        <Link to="/shop">Shop</Link>
      </li>
      <li>
        <Link to="/aboutUs">About Us</Link>
      </li>
      <li>
        <Link to="/">Blogs</Link>
      </li>
      <li>
        <Link to="/contactUs">Contact Us</Link>
      </li>
      <li>
        <Link to="/dashboard">My Account</Link>
      </li>
    </>
  );

  return (
    <nav>
      <TopBar />
      <div className="navbar px-[0.5rem] xl:px-[10rem] flex justify-between items-center gap-7 shadow">
        <div className="w-full relative">
          <div className="relative w-3/5 md:w-[220px]" ref={categoryRef}>
            <button
              className="w-full flex justify-start gap-3 uppercase text-[#ff5a00]"
              onClick={handleCategoryButtonClick}
            >
              Categories
              <span className="float-right">&#9662;</span>
            </button>

            {isCategoryOpen && (
              <div
                className="absolute translate-x-2 w-full h-[62vh] mt-2 p-3 bg-[#ff5a00] shadow-md z-20"
                onMouseLeave={handleMouseLeave}
              >
                <ul className="listed">
                  {categories.map((category, index) => (
                    <li
                      key={index}
                      className="flex justify-between items-center p-2 w-full border-b text-white border-orange-400 hover:bg-white cursor-pointer"
                      onMouseEnter={() => handleCategoryHover(category)}
                    >
                      {category} <span className="float-right">&#9656;</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>

          <div ref={productModalRef}>
            {selectedCategory && isProductModalOpen && (
              <div
                className="absolute mt-5 w-3/5 md:w-[300px] h-[62vh] p-3 overflow-auto bg-white shadow-md z-20"
                onMouseEnter={handleMouseEnterProductModal}
                onMouseLeave={handleProductModalLeave}
              >
                <ul className="listed">
                  {products
                    .filter(product => product.category === selectedCategory)
                    .map((product, index) => (
                      <li
                        key={index}
                        className="p-2 flex cursor-pointer hover:bg-gray-100"
                        onClick={() => handleProductClick(product._id)}
                      >
                        {product.name}
                      </li>
                    ))}
                </ul>
              </div>
            )}
          </div>

          <div className="navbar-center hidden sm:flex">
            <ul className="listed menu-horizontal custom-navbar-menu text-sm uppercase items-center gap-5">
              {navOptions}
            </ul>
          </div>
        </div>

        <div className="sm:hidden">
          <button
            className="bg-[#15161d] hover:bg-[#ff5a00] text-white p-1.5 rounded-full transition-all"
            onClick={() => setToggle(!toggle)}
          >
            {!toggle ? (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            ) : (
              <svg
                className="w-6 h-6"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            )}
          </button>

          <div
            className={`mobile-menu ${
              toggle ? 'open' : ''
            } fixed bg-white flex flex-col justify-start left-0 top-0 w-1/2 h-screen z-50 overflow-hidden`}
            ref={mobileMenuRef}
          >
            <Link
              to="/"
              className="w-full text-center border-b-[3px] border-[#ff5a00]"
              onClick={() => setToggle(false)}
            >
              <img src={logo} className="w-24" alt="" />
            </Link>
            <ul
              className="listed responsive p-2 px-5 mt-10 list-none flex flex-col text-lg gap-4 w-full"
              onClick={() => setToggle(false)}
            >
              {navOptions}
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
