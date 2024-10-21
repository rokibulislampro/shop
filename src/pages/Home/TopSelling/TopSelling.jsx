import React, { useContext, useEffect, useRef, useState } from 'react';
import Slider from 'react-slick';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import {
  CartContext,
  WishlistContext,
} from '../../../Features/ContextProvider';
import { FaExchangeAlt, FaRegEye, FaRegHeart } from 'react-icons/fa';
import ProductPopup from '../../Shared/ProductPopup/ProductPopup';
import { toast } from 'react-toastify';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner'; // Import the LoadingSpinner component
import { Link } from 'react-router-dom';

// Custom Next Arrow component
const NexArrow = ({ onClick }) => (
  <div
    className="flex items-center text-[#ff5a00] justify-center w-10 h-10 hover:text-white bg-gray-100 hover:bg-[#ff5a00] rounded-full shadow-lg cursor-pointer transition-all"
    onClick={onClick}
  >
    &#10095;
  </div>
);

// Custom Previous Arrow component
const PreArrow = ({ onClick }) => (
  <div
    className="flex items-center text-[#ff5a00] justify-center w-10 h-10 hover:text-white bg-gray-100 hover:bg-[#ff5a00] rounded-full shadow-lg cursor-pointer transition-all"
    onClick={onClick}
  >
    &#10094;
  </div>
);

const TopSelling = () => {
  const [products, setProducts] = useState([]);
  const [wishlistState, setWishlistState] = useState({});
  const [selectedProduct, setSelectedProduct] = useState(null); // For showing popup
  const [loading, setLoading] = useState(true); // Loading state
  const axiosSecure = useAxiosSecure();
  const { cart, cartDispatch } = useContext(CartContext);
  const { wishlistDispatch } = useContext(WishlistContext);
  const sliderRef = useRef(null); // Reference for the slider

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosSecure.get('/product');
        const sortedProducts = response.data.sort((a, b) => b.sold - a.sold);
        setProducts(sortedProducts);
      } catch (error) {
        console.error('Error fetching Products:', error);
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };

    fetchProducts();
  }, [axiosSecure]);

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

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4, // Adjust this if necessary
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 480, // Add settings for mobile screens
        settings: {
          slidesToShow: 2,
        },
      },
    ],
  };

  return (
    <section className="m-[0.5rem] xl:mx-[10rem] overflow-x-hidden">
      {loading ? (
        <LoadingSpinner /> // Show loader while loading
      ) : (
        <>
          <div className="flex justify-between items-center my-3">
            <h2 className="text-2xl font-semibold uppercase">Top Selling</h2>
            <div className="flex items-center gap-2">
              <PreArrow onClick={() => sliderRef.current.slickPrev()} />
              <NexArrow onClick={() => sliderRef.current.slickNext()} />
            </div>
          </div>
          <Slider ref={sliderRef} {...settings}>
            {products.map(product => {
              const discountPercentage = (
                ((product.price - product.discountPrice) / product.price) *
                100
              ).toFixed(0);

              return (
                <div
                  key={product._id}
                  className="w-full h-full p-0.5 md:p-3 group"
                >
                  <div className="w-full h-full rounded hover:rounded-none shadow-sm border hover:border-2 hover:border-[#ff5a00] p-2.5 transition-all hover:text-[#ff5a00] group relative">
                    <div className="relative">
                      <div className="absolute z-10 w-full flex justify-between items-start gap-1">
                        <div className="space-y-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          {product.status !== 'Out of Stock' && (
                            <>
                              <div className="flex items-center justify-center">
                                {!wishlistState[product._id] && (
                                  <div
                                    onClick={() => handleAddToWishlist(product)}
                                  >
                                    <FaRegHeart className="cursor-pointer w-8 h-8 shadow-xl text-xl bg-white hover:bg-[#ff5a00] hover:text-white rounded-full p-2 transition-all" />
                                  </div>
                                )}
                              </div>
                              <div className="flex items-center justify-center">
                                <FaRegEye
                                  className="cursor-pointer w-8 h-8 shadow-xl text-xl bg-white hover:bg-[#ff5a00] hover:text-white rounded-full p-2 transition-all"
                                  onClick={() => setSelectedProduct(product)}
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
                            const x = ((e.clientX - left) / width) * 100;
                            const y = ((e.clientY - top) / height) * 100;
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
                            <div onClick={() => handleAddToWishlist(product)}>
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
                              onClick={() => removeFromCart(product._id)}
                            >
                              Remove Item
                            </button>

                            {/* Buy Now Button */}
                            <Link to="/checkout" className="w-full mt-1">
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
                            <Link to="/checkout" className="w-full mt-1">
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
          </Slider>

          {/* Product Popup */}
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

export default TopSelling;
