import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import {
  CartContext,
  WishlistContext,
} from '../../../Features/ContextProvider';
import noProduct from '../../../assets/Icons/bag.png';
import { FaExchangeAlt, FaRegEye, FaRegHeart } from 'react-icons/fa';
import ProductPopup from '../../Shared/ProductPopup/ProductPopup';
import { toast } from 'react-toastify';
import normalFilterIcon from '../../../assets/Icons/filter.png';
import hoverFilterIcon from '../../../assets/Icons/hoverFilter.png';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const ShopCard = () => {
  const { category } = useParams();
  const [products, setProducts] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [loading, setLoading] = useState(true);
  const [wishlistState, setWishlistState] = useState({});
  const [currentPage, setCurrentPage] = useState(1);
  const recordsPerPage = 12;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = products.slice(firstIndex, lastIndex);
  const nPage = Math.ceil(products.length / recordsPerPage);

  const [currentPageSet, setCurrentPageSet] = useState(1);
  const maxPageSetSize = 4; // Max number of pages to show at once
  const pageSetStart = (currentPageSet - 1) * maxPageSetSize + 1;
  const pageSetEnd = Math.min(pageSetStart + maxPageSetSize - 1, nPage);

  const [sortOption, setSortOption] = useState('');
  const [selectedShort, setSelectedShort] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [isClearVisible, setIsClearVisible] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const [brands, setBrands] = useState([]);
  const [selectedBrand, setSelectedBrand] = useState('');
  const [isBrandOpen, setIsBrandOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { cart, cartDispatch } = useContext(CartContext);
  const { wishlistDispatch } = useContext(WishlistContext);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        let response;
        let products;

        // Fetch products based on the selected category
        if (category) {
          const encodedCategory = encodeURIComponent(category); // Encode category for URL
          response = await axiosSecure.get(
            `/product?category=${encodedCategory}`
          );
        } else {
          response = await axiosSecure.get('/product');
        }

        products = response.data;

        // Sort products based on the selected sort option
        if (sortOption === 'Low to High') {
          products = products.sort((a, b) => a.discountPrice - b.discountPrice);
        } else if (sortOption === 'High to Low') {
          products = products.sort((a, b) => b.discountPrice - a.discountPrice);
        } else if (sortOption === 'Newest Arrives') {
          products = products.sort(
            (a, b) => new Date(b.date) - new Date(a.date)
          );
        }

        // Extract unique categories from products
        const uniqueCategories = [
          ...new Set(products.map(product => product.category)),
        ];
        setCategories(uniqueCategories);

        // Filter products by selected category
        if (selectedCategory) {
          products = products.filter(
            product => product.category === selectedCategory
          );
        }

        // Extract unique brands from products
        const uniqueBrands = [
          ...new Set(products.map(product => product.brand)),
        ];
        setBrands(uniqueBrands);

        // Filter products by selected brand
        if (selectedBrand) {
          products = products.filter(
            product => product.brand === selectedBrand
          );
        }

        // Show the clear filter button if any filter is selected
        if (selectedCategory || selectedBrand || sortOption) {
          setIsClearVisible(true); // Show Clear Filter button
        } else {
          setIsClearVisible(false); // Hide Clear Filter button
        }

        setProducts(products);
      } catch (error) {
        console.error('Error fetching products:', error);
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };

    fetchProducts();
  }, [category, sortOption, selectedCategory, selectedBrand, axiosSecure]);

  // Clear Filter button handler
  const handleClearFilters = () => {
    // Resetting category, brand, and sorting
    setSelectedCategory(null); // Category reset
    setSelectedBrand(null); // Brand reset
    setSelectedShort(null); // Sorting reset
    setSortOption(null);

    // Hide clear filter button if necessary
    setIsClearVisible(false);
  };

  const shortType = [
    { name: 'Low to High', onClick: () => setSortOption('Low to High') },
    { name: 'High to Low', onClick: () => setSortOption('High to Low') },
    {
      name: 'Newest Arrives',
      onClick: () => setSortOption('Newest Arrives'),
    },
  ];

  const handleSelect = short => {
    setSelectedShort(short.name);
    short.onClick(); // Call the specific onClick function
    setIsOpen(false);
  };

  const handleCategorySelect = category => {
    setSelectedCategory(category);
    setIsCategoryOpen(false);
  };

  const handleBrandSelect = brand => {
    setSelectedBrand(brand);
    setIsBrandOpen(false);
  };

  // const handleBuyNow = productId => {
  //   navigate(`/Product/${productId}`);
  // };

  const handleAddToWishlist = product => {
    wishlistDispatch({
      type: 'ADD_TO_WISHLIST',
      product: { ...product, id: product._id },
    });
    setWishlistState(prevState => ({
      ...prevState,
      [product._id]: true,
    }));
    toast.success(`${product.name} added to wishlist!`);
  };

  const addToCart = product => {
    cartDispatch({
      type: 'Add',
      product: { ...product, id: product._id },
    });
    toast.success(`${product.name} added to cart!`);
  };

  // Adjusted handleBuyNow function
  const handleBuyNow = product => {
    // Adding product to cart
    cartDispatch({
      type: 'Add',
      product: {
        ...product,
        id: product._id,
        quantity: 1, // Assuming a default quantity of 1; adjust if needed
      },
    });
    toast.success('Proceeding to Checkout');
  };

  const removeFromCart = id => {
    cartDispatch({ type: 'Remove', id });
    toast.info(`Item removed from cart.`);
  };

  const isInCart = id => {
    return cart.some(item => item.id === id);
  };

  function prePage() {
    if (currentPage !== 1) {
      setCurrentPage(currentPage - 1);
      if (currentPage === pageSetStart && currentPageSet > 1) {
        setCurrentPageSet(currentPageSet - 1);
      }
    }
  }

  function changePage(_id) {
    setCurrentPage(_id);
  }

  function nextPage() {
    if (currentPage !== nPage) {
      setCurrentPage(currentPage + 1);
      if (
        currentPage === pageSetEnd &&
        currentPageSet < Math.ceil(nPage / maxPageSetSize)
      ) {
        setCurrentPageSet(currentPageSet + 1);
      }
    }
  }

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  // Handle click outside the modal
  useEffect(() => {
    const handleClickOutside = event => {
      const modal = document.getElementById('filter-modal');
      const filterButton = document.getElementById('filter-button');

      // Check if the click is outside the modal and not on the button
      if (
        isFilterOpen &&
        modal &&
        !modal.contains(event.target) &&
        !filterButton.contains(event.target)
      ) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isFilterOpen]);

  // Toggle filter modal function
  const toggleFilter = () => {
    setIsFilterOpen(prev => !prev);
  };

  return (
    <section className="m-[0.5rem] xl:mx-[10rem]">
      {loading ? (
        <LoadingSpinner /> // Show loader while loading
      ) : (
        <>
          <div className="flex">
            <div className="sm:w-1/4 lg:w-1/6 hidden sm:block">
              <h3 className="font-semibold text-sm text-[#ff5a00] my-5">
                Advanced Search ({products.length})
              </h3>

              {/* Clear Filter Button */}
              {isClearVisible && (
                <div className="w-11/12 relative bg-[#ff5a00] text-white mb-2 rounded overflow-hidden">
                  <button
                    onClick={handleClearFilters}
                    className="w-full p-2.5 border text-sm text-center focus:outline-none"
                  >
                    Clear Filter
                  </button>
                </div>
              )}

              {/* Category Options */}
              <div className="w-11/12 mt-4 relative">
                <div className="relative">
                  <button
                    onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                    className="w-full p-2.5 text-[#ff5a00] border text-sm rounded-sm text-left focus:outline-none"
                  >
                    <span className="text-gray-700 hover:text-[#ff5a00]">
                      {selectedCategory ? selectedCategory : 'Select Category'}
                    </span>
                    <span className="float-right">&#9662;</span>
                  </button>
                  {isCategoryOpen && (
                    <div className="w-full mt-2 rounded-md bg-white z-10">
                      <ul className="listed">
                        {categories.map((category, index) => (
                          <li key={index} className="p-2 hover:bg-gray-100">
                            <button
                              onClick={() => handleCategorySelect(category)}
                              className={`w-full text-left ${
                                selectedCategory === category
                                  ? 'text-[#ff5a00]'
                                  : 'text-gray-700'
                              }`}
                            >
                              {category}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {/* Brand Options */}
              <div className="w-11/12 mt-4 relative">
                <div className="relative">
                  <button
                    onClick={() => setIsBrandOpen(!isBrandOpen)}
                    className="w-full p-2.5 text-[#ff5a00] border text-sm rounded-sm text-left focus:outline-none"
                  >
                    <span className="text-gray-700 hover:text-[#ff5a00]">
                      {selectedBrand ? selectedBrand : 'Select Brand'}
                    </span>
                    <span className="float-right">&#9662;</span>
                  </button>
                  {isBrandOpen && (
                    <div className="w-full mt-2 rounded-md bg-white z-10">
                      <ul className="listed">
                        {brands.map((brand, index) => (
                          <li key={index} className="p-2 hover:bg-gray-100">
                            <button
                              onClick={() => handleBrandSelect(brand)}
                              className={`w-full text-left ${
                                selectedBrand === brand
                                  ? 'text-[#ff5a00]'
                                  : 'text-gray-700'
                              }`}
                            >
                              {brand}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>
            </div>

            <div className="w-full">
              <div className="flex w-full m-1 md:m-2 justify-between sm:justify-end items-center p-[0.5rem] bg-white shadow-md rounded-sm">
                <div className="w-1/2 md:w-[220px] sm:hidden">
                  <div className="flex items-center gap-2">
                    <button
                      id="filter-button" // Added id to filter button
                      onClick={toggleFilter}
                      className="bg-white hover:bg-[#ff5a00] p-1.5 px-5 rounded shadow-md transition-all"
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <img
                        src={isHovered ? hoverFilterIcon : normalFilterIcon}
                        alt="Filter Button"
                        className="w-6"
                      />
                    </button>
                    <h4 className="font-semibold text-xs text-[#ff5a00] my-5">
                      Advanced Search ({products.length})
                    </h4>
                  </div>
                  <div className="w-full">
                    {isFilterOpen && (
                      <div
                        id="filter-modal"
                        className="absolute w-1/2 md:w-[220px] bg-white h-[58vh] overflow-hidden mt-2 p-3 shadow-md z-20"
                      >
                        {/* Clear Filter Button */}
                        {isClearVisible && (
                          <div className="w-11/12 relative bg-[#ff5a00] text-white mb-2 rounded overflow-hidden">
                            <button
                              onClick={handleClearFilters}
                              className="w-full p-2.5 border text-sm text-center focus:outline-none"
                            >
                              Clear Filter
                            </button>
                          </div>
                        )}

                        {/* Category Options */}
                        <div className="w-11/12 mt-4 relative">
                          <div className="relative">
                            <button
                              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
                              className="w-full p-2.5 text-[#ff5a00] border text-sm rounded-sm text-left focus:outline-none"
                            >
                              <span className="text-gray-700 hover:text-[#ff5a00]">
                                {selectedCategory
                                  ? selectedCategory
                                  : 'Select Category'}
                              </span>
                              <span className="float-right">&#9662;</span>
                            </button>
                            {isCategoryOpen && (
                              <div className="w-full mt-2 rounded-md overflow-auto bg-white z-10">
                                <ul className="listed">
                                  {categories.map((category, index) => (
                                    <li
                                      key={index}
                                      className="p-2 hover:bg-gray-100"
                                    >
                                      <button
                                        onClick={() =>
                                          handleCategorySelect(category)
                                        }
                                        className={`w-full text-left ${
                                          selectedCategory === category
                                            ? 'text-[#ff5a00]'
                                            : 'text-gray-700'
                                        }`}
                                      >
                                        {category}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>

                        {/* Brand Options */}
                        <div className="w-11/12 mt-4 relative">
                          <div className="relative">
                            <button
                              onClick={() => setIsBrandOpen(!isBrandOpen)}
                              className="w-full p-2.5 text-[#ff5a00] border text-sm rounded-sm text-left focus:outline-none"
                            >
                              <span className="text-gray-700 hover:text-[#ff5a00]">
                                {selectedBrand ? selectedBrand : 'Select Brand'}
                              </span>
                              <span className="float-right">&#9662;</span>
                            </button>
                            {isBrandOpen && (
                              <div className="w-full mt-2 rounded-md overflow-auto bg-white z-10">
                                <ul className="listed">
                                  {brands.map((brand, index) => (
                                    <li
                                      key={index}
                                      className="p-2 hover:bg-gray-100"
                                    >
                                      <button
                                        onClick={() => handleBrandSelect(brand)}
                                        className={`w-full text-left ${
                                          selectedBrand === brand
                                            ? 'text-[#ff5a00]'
                                            : 'text-gray-700'
                                        }`}
                                      >
                                        {brand}
                                      </button>
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
                <div className="relative right-0">
                  <button
                    onClick={() => setIsOpen(!isOpen)}
                    className="w-[9rem] p-2.5 bg-[#ff5a00] text-white text-sm border rounded-sm text-left focus:outline-none"
                  >
                    <span className="text-white">
                      {selectedShort ? selectedShort : 'Select Sorting'}
                    </span>
                    <span className="float-right">&#9662;</span>
                  </button>
                  {isOpen && (
                    <div className="absolute w-full mt-2 bg-white rounded-sm z-20">
                      <ul className="listed">
                        {shortType.map((short, index) => (
                          <li key={index} className="p-2 hover:bg-gray-100">
                            <button
                              onClick={() => handleSelect(short)}
                              className={`w-full text-left ${
                                selectedShort === short.name
                                  ? 'text-[#ff5a00]'
                                  : 'text-gray-700'
                              }`}
                            >
                              {short.name}
                            </button>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </div>

              {records.length === 0 ? (
                <div className="grid text-center space-y-2">
                  <div className="bg-slate-200 w-fit m-auto p-2 rounded-full overflow-hidden">
                    <img
                      className="w-12 translate-y-3"
                      src={noProduct}
                      alt=""
                    />
                  </div>
                  <p className="text-lg">
                    This band is not showing any same products.
                  </p>
                  <p className="font-semibold">
                    Please select another brand for the same product
                  </p>
                </div>
              ) : (
                <>
                  <div className="w-full grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
                    {records.map(product => {
                      const discountPercentage = (
                        ((product.price - product.discountPrice) /
                          product.price) *
                        100
                      ).toFixed(0);

                      return (
                        <div
                          key={product._id}
                          className="w-full h-full p-0.5 md:p-2 group"
                        >
                          <div className="w-full h-full flex-1 rounded hover:rounded-none shadow-sm border hover:border-[1.6px] hover:border-[#ff5a00] hover:text-[#ff5a00] p-2.5 transition-all group relative">
                            <div className="relative w-full">
                              <div className="absolute z-10 w-full flex justify-between items-start gap-1">
                                <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                  {product.status !== 'Out of Stock' && (
                                    <>
                                      <div className="flex items-center justify-center">
                                        {!wishlistState[product._id] && (
                                          <div
                                            onClick={() =>
                                              handleAddToWishlist(product)
                                            }
                                          >
                                            <FaRegHeart className="cursor-pointer w-8 h-8 shadow-xl text-xl bg-white hover:bg-[#ff5a00] hover:text-white rounded-full p-2 transition-all" />
                                          </div>
                                        )}
                                      </div>
                                      <div className="flex items-center justify-center">
                                        <FaRegEye
                                          className="cursor-pointer w-8 h-8 shadow-xl text-xl bg-white hover:bg-[#ff5a00] hover:text-white rounded-full p-2 transition-all"
                                          onClick={() =>
                                            setSelectedProduct(product)
                                          }
                                        />
                                      </div>
                                    </>
                                  )}
                                </div>

                                <div className="md:flex items-center gap-1 right-0">
                                  {/* Only show "Deal Limit" if discountPercentage is 40% or more */}
                                  {product.status !== 'Out of Stock' &&
                                    product.discountPrice > 0 &&
                                    discountPercentage >= 25 && (
                                      <p className="flex items-center text-xs md:text-md gap-1 bg-[#ff5a00] text-white rounded-full px-2.5 p-0.5">
                                        Deal<span>Limit</span>
                                      </p>
                                    )}
                                  {product.status === 'Out of Stock' ? (
                                    <p className="bg-[#ff5a00] text-white text-xs md:text-md rounded-full px-2.5 p-0.5">
                                      Stock Out
                                    </p>
                                  ) : product.discountPrice > 0 ? (
                                    <p className="w-fit ml-auto bg-[#ff5a00] text-center right-0 text-white text-xs md:text-md rounded-full px-2.5 p-0.5 mt-0.5">
                                      -{discountPercentage}%
                                    </p>
                                  ) : null}
                                </div>
                              </div>
                              <div className="flex justify-center items-center overflow-hidden">
                                <img
                                  src={product.image}
                                  alt={product.name}
                                  className="w-[300px] h-[135px] md:h-[250px] object-cover transition-transform duration-300 ease-in-out transform hover:scale-150 hover:cursor-zoom-in"
                                  style={{ transformOrigin: 'center' }}
                                  onMouseMove={e => {
                                    const { left, top, width, height } =
                                      e.target.getBoundingClientRect();
                                    const x =
                                      ((e.clientX - left) / width) * 100;
                                    const y =
                                      ((e.clientY - top) / height) * 100;
                                    e.target.style.transformOrigin = `${x}% ${y}%`;
                                  }}
                                />
                              </div>
                            </div>
                            <div className="w-full text-center my-3">
                              <p className="uppercase text-xs text-slate-500 hover:text-[#ff5a00]">
                                {product.category}
                              </p>
                              <p className="font-semibold text-[12px] md:text-[14px] uppercase text-gray-700 hover:text-[#ff5a00]">
                                {product.name}
                              </p>

                              <div className="flex justify-center items-center gap-2">
                                {product.discountPrice > 0 ? (
                                  <>
                                    <p className="text-xl font-semibold font-serif text-[#ff5a00]">
                                      ৳{product.discountPrice}
                                    </p>
                                    <p className="font-serif text-slate-500">
                                      <s>৳{product.price}</s>
                                    </p>
                                  </>
                                ) : (
                                  <p className="text-xl font-semibold font-serif text-[#ff5a00]">
                                    ৳{product.price}
                                  </p>
                                )}
                              </div>

                              <div className="relative group">
                                <hr
                                  className={`mt-4 ${
                                    product.status === 'Available'
                                      ? 'group-hover:opacity-0'
                                      : 'opacity-100'
                                  }`}
                                />

                                {/* Product rating */}
                                {product.rating > 0 && (
                                  <div
                                    className={`absolute w-full flex justify-center items-center transform -translate-y-1/2 transition-opacity duration-300 ${
                                      product.status === 'Available'
                                        ? 'group-hover:opacity-0'
                                        : 'opacity-100'
                                    }`}
                                  >
                                    <div className="flex space-x-0">
                                      {Array.from({ length: 5 }, (_, index) => {
                                        const rating = product.rating;
                                        const fullStar =
                                          index + 1 <= Math.floor(rating);
                                        const halfStar =
                                          index + 1 > Math.floor(rating) &&
                                          index < rating;

                                        return (
                                          <svg
                                            key={index}
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-[1.2rem] w-[1.2rem]"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                          >
                                            {fullStar ? (
                                              <path
                                                fill="#ff5a00"
                                                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                              />
                                            ) : halfStar ? (
                                              <g>
                                                <defs>
                                                  <linearGradient
                                                    id={`halfStar-${index}`}
                                                  >
                                                    <stop
                                                      offset="50%"
                                                      stopColor="#ff5a00"
                                                    />
                                                    <stop
                                                      offset="50%"
                                                      stopColor="#D1D5DB"
                                                    />
                                                  </linearGradient>
                                                </defs>
                                                <path
                                                  fill={`url(#halfStar-${index})`}
                                                  d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                                />
                                              </g>
                                            ) : (
                                              <path
                                                fill="#D1D5DB"
                                                d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z"
                                              />
                                            )}
                                          </svg>
                                        );
                                      })}
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>

                            <div className="relative py-2.5">
                              <div
                                className={`flex justify-center items-center gap-4 transition-all ${
                                  product.status === 'Available'
                                    ? 'group-hover:opacity-0'
                                    : ''
                                }`}
                              >
                                <div className="w-fit flex items-center hover:p-1 justify-center rounded-full hover:bg-[#ff5a00] hover:text-white transition-all">
                                  {!wishlistState[product._id] && (
                                    <div
                                      onClick={() =>
                                        handleAddToWishlist(product)
                                      }
                                    >
                                      <FaRegHeart className="cursor-pointer hover:p-1 text-xl transition-all" />
                                    </div>
                                  )}
                                </div>
                                <FaExchangeAlt />
                                <div className="w-fit flex items-center justify-center hover:p-1 rounded-full hover:bg-[#ff5a00] hover:text-white transition-all">
                                  <FaRegEye
                                    className="cursor-pointer hover:p-1 text-xl transition-all"
                                    onClick={() => setSelectedProduct(product)}
                                  />
                                </div>
                              </div>
                              <div className="absolute w-full flex flex-col items-end opacity-0 group-hover:opacity-100 transition-opacity text-sm transform -translate-y-20 mt-4 md:mt-3">
                                {isInCart(product._id) ? (
                                  <>
                                    <button
                                      className="text-center w-full h-8 md:h-9 rounded-full bg-orange-600 text-white font-semibold mt-2"
                                      onClick={() =>
                                        removeFromCart(product._id)
                                      }
                                    >
                                      Remove Item
                                    </button>

                                    {/* Buy Now Button */}
                                    <Link
                                      to="/checkout"
                                      className="w-full mt-1"
                                    >
                                      <button
                                        className="w-full text-center bg-[#1e1f29] text-white font-semibold rounded-full h-8 md:h-9"
                                        onClick={() => handleBuyNow(product)} // Pass the product here
                                      >
                                        Buy Now
                                      </button>
                                    </Link>
                                  </>
                                ) : product.status !== 'Out of Stock' &&
                                  product.slots > 0 ? (
                                  <>
                                    <button
                                      className="text-center w-full h-8 md:h-9 rounded-full bg-[#ff5a00] text-white font-semibold mt-2"
                                      onClick={() => addToCart(product)}
                                    >
                                      Add To Cart
                                    </button>

                                    {/* Buy Now Button */}
                                    <Link
                                      to="/checkout"
                                      className="w-full mt-1"
                                    >
                                      <button
                                        className="w-full text-center bg-[#1e1f29] text-white font-semibold rounded-full h-8 md:h-9"
                                        onClick={() => handleBuyNow(product)} // Pass the product here
                                      >
                                        Buy Now
                                      </button>
                                    </Link>
                                  </>
                                ) : null}
                              </div>
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>

                  <div className="flex justify-center items-center text-sm my-10">
                    <button
                      className="bg-[#ff5a00] text-white p-2 sm:px-4 sm:py-2 rounded-l-full hover:bg-orange-600"
                      onClick={prePage}
                    >
                      &#9666; Prev
                    </button>
                    <ul className="flex">
                      {Array.from(
                        { length: pageSetEnd - pageSetStart + 1 },
                        (_, i) => pageSetStart + i
                      ).map(n => (
                        <li
                          key={n}
                          className={`mx-1 ${
                            currentPage === n
                              ? 'bg-[#ff5a00] text-white hover:text-white'
                              : 'bg-[#fc9258] text-white'
                          }`}
                        >
                          <button
                            className="px-3 sm:px-4 py-2 rounded-none"
                            onClick={() => changePage(n)}
                          >
                            {n}
                          </button>
                        </li>
                      ))}
                    </ul>
                    <button
                      className="bg-[#ff5a00] text-white p-2 sm:px-4 sm:py-2 rounded-r-full hover:bg-orange-600"
                      onClick={nextPage}
                    >
                      Next &#9656;
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
          {selectedProduct && (
            <ProductPopup
              product={selectedProduct}
              onClose={() => setSelectedProduct(null)}
            />
          )}
        </>
      )}
    </section>
  );
};

export default ShopCard;
