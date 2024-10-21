import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import facebook from '../../../assets/Icons/facebook.png';
import youtube from '../../../assets/Icons/youtube.png';
import whatsapp from '../../../assets/Icons/whatsapp.png';
import pinterest from '../../../assets/Icons/pinterest.png';
import { CartContext } from '../../../Features/ContextProvider';
import { toast } from 'react-toastify';

const ProductCard = () => {
  const { id } = useParams();
  const [product, setProduct] = useState({});
  const [quantity, setQuantity] = useState(1);
  const axiosSecure = useAxiosSecure();
  const { cartDispatch } = useContext(CartContext);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axiosSecure.get(`/product/${id}`);
        setProduct(response.data || {});
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [id, axiosSecure]);

  const increaseQuantity = () => setQuantity(prevQuantity => prevQuantity + 1);
  const decreaseQuantity = () =>
    setQuantity(prevQuantity => (prevQuantity > 1 ? prevQuantity - 1 : 1));

  const discountPercentage =
    product.price && product.discountPrice
      ? (
          ((product.price - product.discountPrice) / product.price) *
          100
        ).toFixed(0)
      : 0;

  const handleAddToCart = () => {
    cartDispatch({
      type: 'Add',
      product: {
        ...product,
        id: product._id,
        quantity: quantity,
      },
    });
    toast.success('Product added to cart!');
  };

  const handleBuyNow = () => {
    cartDispatch({
      type: 'Add',
      product: {
        ...product,
        id: product._id,
        quantity: quantity,
      },
    });
    toast.success('Proceeding to Checkout');
  };

  return (
    <section className="bg-slate-50 py-5 text-sm">
      <div className="bg-white m-[1rem] md:mx-[5rem] xl:mx-[15rem] p-[1.5rem] shadow-md">
        <div className="grid sm:grid-cols-2 gap-4">
          <div className="h-[12rem] sm:h-full sm:w-full flex justify-center items-center overflow-hidden rounded">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-md object-cover transition-transform duration-300 ease-in-out transform hover:scale-150 hover:cursor-zoom-in"
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
          <div>
            <h2 className="text-xl md:text-3xl mt-2 font-semibold">
              {product.name}
            </h2>
            <hr className="my-2" />
            <div className="flex items-center gap-2">
              {product.discountPrice > 0 ? (
                <>
                  <div className="flex items-center font-serif gap-3 font-semibold">
                    <p className="text-[#ff5a00] text-2xl font-bold">
                      <span className="font-extrabold">৳</span>{' '}
                      {product.discountPrice}
                    </p>
                    <p className="text-[#848484]">
                      <s>
                        <span className="font-extrabold">৳</span>{' '}
                        {product.price}
                      </s>
                    </p>
                    <p className="text-[#ff5a00]">(-{discountPercentage}%)</p>
                  </div>
                </>
              ) : (
                <p className="text-xl font-semibold font-serif text-[#ff5a00]">
                  ৳{product.price}
                </p>
              )}
            </div>
            <p className="my-1 sm:my-3">
              {product.brand ? (
                <>
                  Brand:{' '}
                  <span className="font-semibold text-slate-700">
                    {product.brand}
                  </span>
                </>
              ) : null}
            </p>
            <div className="flex md:block items-center gap-3">
              <p>
                Status:{' '}
                <span
                  className={`font-semibold ${
                    product.status === 'Available'
                      ? 'text-[#4c9e16]'
                      : 'text-orange-500'
                  }`}
                >
                  {product.status}
                </span>
              </p>
              <p className="my-1 sm:my-3">
                SKU:{' '}
                <span className="font-semibold text-slate-700">
                  {product.sku}
                </span>
              </p>
            </div>
            <p className="mt-2">{product.description}</p>
            {product.status !== 'Out of Stock' && (
              <div className="flex items-center my-2 md:my-4">
                <button
                  className="bg-slate-100 hover:bg-[#ff5a00] hover:text-white transition-all w-[45px] h-[45px] font-bold text-xl rounded-full"
                  onClick={decreaseQuantity}
                >
                  -
                </button>
                <input
                  type="text"
                  value={quantity}
                  readOnly
                  className="w-10 text-center font-semibold border-gray-300 rounded-md"
                />
                <button
                  className="bg-slate-100 hover:bg-[#ff5a00] hover:text-white transition-all w-[45px] h-[45px] font-bold text-xl rounded-full"
                  onClick={increaseQuantity}
                >
                  +
                </button>
              </div>
            )}
            {product.status !== 'Out of Stock' && (
              <div className="flex gap-3">
                <button
                  className="bg-[#ff5a00] hover:bg-orange-600 text-white font-semibold rounded-full px-5 lg:px-8 py-2 transition-all"
                  onClick={handleAddToCart}
                >
                  Add to Cart
                </button>
                <Link to="/Checkout">
                  <button
                    className="bg-[#1e1f29] text-white font-semibold rounded-full px-5 lg:px-8 py-2"
                    onClick={handleBuyNow}
                  >
                    Buy Now
                  </button>
                </Link>
              </div>
            )}
            <hr className="my-4" />
            <div className="flex items-center gap-2">
              {product.category ? (
                <p>
                  Category:{' '}
                  <span className="font-semibold font-serif">
                    {product.category}
                  </span>
                </p>
              ) : null}
              {product.subcategory ? (
                <p>
                  Subcategory:{' '}
                  <span className="font-semibold font-serif">
                    {product.subcategory}
                  </span>
                </p>
              ) : null}
            </div>
            <div className="flex space-x-3 w-48 mt-3">
              <a
                href="https://www.facebook.com/profile.php?id=100081657349541&mibextid=ZbWKwL"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={facebook} alt="Facebook" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src={youtube} alt="YouTube" />
              </a>
              <a
                href="https://wa.me/qr/NMFE2J4B3T6IE1"
                target="_blank"
                rel="noopener noreferrer"
              >
                <img src={whatsapp} alt="WhatsApp" />
              </a>
              <a href="#" target="_blank" rel="noopener noreferrer">
                <img src={pinterest} alt="Pinterest" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductCard;
