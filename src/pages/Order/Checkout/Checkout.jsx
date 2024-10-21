import { useState, useContext, useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import { CartContext } from '../../../Features/ContextProvider';
import { totalPrice } from '../../../Features/CartReducer';
import './Checkout.css';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { useNavigate } from 'react-router-dom';

const Checkout = () => {
  const [selectedOption, setSelectedOption] = useState('Cash on Delivery');
  const { cart, cartDispatch } = useContext(CartContext);
  const [orderPlaced, setOrderPlaced] = useState(false);
  const [error, setError] = useState(null);
  const [deliveryCharge, setDeliveryCharge] = useState(0); // Step 1: State for delivery charge
  const axiosSecure = useAxiosSecure();
  const [isChecked, setIsChecked] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (cart.length === 0) {
      navigate('/Cart');
    }
  }, [cart, navigate]);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };

  const generateOrderId = () => {
    const chars = '0123456789';
    let orderId = '';
    for (let i = 0; i < 6; i++) {
      orderId += chars[Math.floor(Math.random() * chars.length)];
    }
    return orderId;
  };

  const generateTrackingId = () => {
    const chars = 'abcdefghijklmnopqrstuvwxyz0123456789';
    let trackingId = '';
    for (let i = 0; i < 8; i++) {
      trackingId += chars[Math.floor(Math.random() * chars.length)];
    }
    return trackingId;
  };

  const handleAreaChange = e => {
    const value = e.target.value;
    if (value === 'inside-dhaka') {
      setDeliveryCharge(50); // Step 2: Set delivery charge for Inside Dhaka
    } else if (value === 'outside-dhaka') {
      setDeliveryCharge(100); // Step 2: Set delivery charge for Outside Dhaka
    } else {
      setDeliveryCharge(0); // Reset delivery charge
    }
  };

  const handleSubmit = async e => {
    e.preventDefault();

    const currentDate = new Date();
    const date = currentDate.toLocaleDateString();
    const time = currentDate.toLocaleTimeString();

    const formatDateTime = date => {
      const options = {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true,
      };
      return date.toLocaleString('en-US', options).replace(',', '');
    };
    const updateDate = formatDateTime(currentDate);

    const billingDetails = {
      fullName: e.target.fullName.value,
      phone: e.target.phone.value,
      email: e.target.email.value,
      address: e.target.address.value,
      country: e.target.country.value,
      district: e.target.district.value,
      additionalInfo: e.target.additionalInfo.value || '',
    };

    const orderDetails = {
      products: cart.map(product => ({
        id: product._id,
        name: product.name,
        category: product.category,
        subcategory: product.subcategory,
        image: product.image,
        quantity: product.quantity,
        purchasePrice: product.purchasePrice,
        price:
          product.discountPrice > 0 ? product.discountPrice : product.price,
        sku: product.sku,
        status: product.status,
      })),
      total: totalPrice(cart),
      deliveryCharge: deliveryCharge,
      grandTotal: totalPrice(cart) + deliveryCharge, // Step 3: Calculate grand total
      date: date,
      time: time,
      paymentMethod: selectedOption,
      termsCondition: isChecked,
      status: 'Pending',
      type: 'Undefined',
    };

    const orderData = {
      orderId: generateOrderId(),
      trackingId: generateTrackingId(),
      billingDetails,
      orderDetails,
    };

    try {
      const response = await axiosSecure.post('/order', orderData);
      if (response.status === 200) {
        for (const product of cart) {
          const remainingSlots = product.slots - product.quantity;
          const addedSold = (product.sold || 0) + product.quantity;

          await axiosSecure.put(`/product/${product.id}`, {
            slots: remainingSlots,
            sold: addedSold,
            updateDate: updateDate,
          });
        }

        cartDispatch({ type: 'CLEAR_CART' });
        setOrderPlaced(true);
      } else {
        setError('Failed to place order. Please try again.');
      }
    } catch (err) {
      if (err.response && err.response.status === 401) {
        setError('Unauthorized. Please log in.');
      } else {
        setError('Failed to place order. Please try again.');
      }
    }
  };

  useEffect(() => {
    if (orderPlaced) {
      navigate('/Ordered');
    }
  }, [orderPlaced, navigate]);

  return (
    <section>
      <Helmet>
        <title>Bondon BD | Checkout</title>
      </Helmet>
      <div className="m-[1rem] xl:mx-[10rem] my-10">
        <form className="md:flex gap-4" onSubmit={handleSubmit}>
          {/* Billing Details Section */}
          <div className="w-full md:w-2/3 border p-5 rounded-lg">
            <h2 className="text-xl font-semibold">Billing Details</h2>
            <hr className="my-3" />
            <div className="space-y-3">
              <div className="md:flex gap-4">
                <div className="w-full">
                  <label htmlFor="fullName" className="block">
                    Full Name <span className="text-[#ff5a00]">*</span>
                  </label>
                  <input
                    type="text"
                    id="fullName"
                    name="fullName"
                    placeholder="Full Name"
                    required
                    className="w-full p-2 md:p-3 border rounded"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="phone" className="block">
                    Phone No.<span className="text-[#ff5a00]">*</span>
                  </label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    placeholder="Phone Mandatory for Order Tracking"
                    required
                    className="w-full p-2 md:p-3 border rounded"
                  />
                </div>
              </div>
              <div className="md:flex gap-4">
                <div className="w-full mt-2 md:mt-0">
                  <label htmlFor="email" className="block">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    placeholder="Email Mandatory for Order Tracking On Website"
                    className="w-full p-2 md:p-3 border rounded"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="address" className="block">
                    Address <span className="text-[#ff5a00]">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    placeholder="Street Address, House Name & No."
                    required
                    className="w-full p-2 md:p-3 border rounded"
                  />
                </div>
              </div>
              <div className="md:flex gap-4">
                <div className="w-full mt-2 md:mt-0">
                  <label htmlFor="district" className="block">
                    City / District <span className="text-[#ff5a00]">*</span>
                  </label>
                  <input
                    type="text"
                    id="district"
                    name="district"
                    placeholder="District"
                    required
                    className="w-full p-2 md:p-3 border rounded"
                  />
                </div>
                <div className="w-full">
                  <label htmlFor="country" className="block">
                    Country
                  </label>
                  <input
                    type="text"
                    id="country"
                    name="country"
                    placeholder="Country"
                    className="w-full p-2 md:p-3 border rounded"
                  />
                </div>
              </div>

              <div>
                <h6 className="font-semibold">
                  Additional Information
                  <span className="text-[#6a6a6b] text-xs"> (optional)</span>
                </h6>
                <hr className="my-2" />
                <textarea
                  id="additionalInfo"
                  name="additionalInfo"
                  placeholder="Add some special notes or anything you did not find above fields..."
                  className="w-full p-2 md:p-3 border rounded"
                />
              </div>
            </div>
          </div>

          {/* Order Summary Section */}
          <div className="w-full md:w-1/3 h-fit mt-10 md:mt-0 border p-5 rounded-lg border-[#ff5a00]">
            <h2 className="text-xl font-semibold">Your Order</h2>
            <hr className="my-3" />
            <div className="flex justify-between text-[#c9c9c9]">
              <p className="flex font-semibold">Product</p>
              <p className="font-semibold">Subtotal</p>
            </div>
            <hr className="my-3" />
            {cart.map(product => (
              <div key={product.id} className="flex justify-between my-3">
                <p>
                  {product.name}{' '}
                  <span className="font-semibold">×{product.quantity}</span>
                </p>
                <p className="font-semibold">
                  ৳{' '}
                  {product.discountPrice > 0
                    ? product.discountPrice * product.quantity
                    : product.price * product.quantity}
                </p>
              </div>
            ))}
            <hr className="my-3" />
            <div className="flex justify-between">
              <p className="font-semibold">Total</p>
              <p className="font-semibold">৳{totalPrice(cart)}</p>
            </div>

            <hr className="my-3" />
            <div className="flex items-center justify-between text-sm">
              <select onChange={handleAreaChange} required className="mr-4">
                <option value="">Select Area</option>
                <option value="inside-dhaka">Inside Dhaka</option>
                <option value="outside-dhaka">Outside Dhaka</option>
              </select>
              <p className="font-semibold">৳{deliveryCharge}</p>
            </div>

            <hr className="my-3" />
            <div className="flex justify-between">
              <p className="font-semibold">Grand Total</p>
              <p className="font-semibold">
                ৳{totalPrice(cart) + deliveryCharge}
              </p>{' '}
              {/* Show grand total */}
            </div>

            <hr className="my-3" />
            {/* Payment Options */}
            <div className="transition-all">
              <div className="mb-2">
                <input
                  type="radio"
                  id="Cash on Delivery"
                  name="payment-option"
                  checked={selectedOption === 'Cash on Delivery'}
                  onChange={() => setSelectedOption('Cash on Delivery')}
                  className="mr-2"
                />
                <label
                  htmlFor="Cash on Delivery"
                  className="text-orange-500 font-semibold text-sm"
                >
                  Cash on Delivery
                </label>
                {selectedOption === 'Cash on Delivery' && (
                  <p className="ml-2 text-gray-500 text-xs">
                    Convenient Cash-on-Delivery Option Available for Hassle-Free
                    Shopping Experience. Delivery Charge Applicable (T&Cs Apply)
                  </p>
                )}
              </div>
              <div className="mb-4">
                <input
                  type="radio"
                  id="digital-payment"
                  name="payment-option"
                  checked={selectedOption === 'Cards, Mobile, Digital Payment'}
                  onChange={() =>
                    setSelectedOption('Cards, Mobile, Digital Payment')
                  }
                  className="mr-2"
                />
                <label
                  htmlFor="digital-payment"
                  className="text-orange-500 font-semibold text-sm"
                >
                  Cards, Mobile, Digital Payment
                </label>
                {selectedOption === 'Cards, Mobile, Digital Payment' && (
                  <p className="ml-2 text-gray-500 text-xs">
                    Pay Securely by Debit/Credit Cards, Mobile Banking, or
                    Internet Banking through SSLCommerz Secure Servers. Delivery
                    Charge Applicable (T&Cs Apply)
                  </p>
                )}
              </div>
            </div>
            <p className="my-3">
              Your personal data will be used to process your order, support
              your experience throughout this website, and for other purposes
              described in our
              <a className="text-orange-500 ml-1 underline">privacy policy.</a>
            </p>
            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={isChecked}
                onChange={handleCheckboxChange}
                required
                className="w-4 h-4 text-orange-500 border-gray-300 rounded focus:ring-orange-500"
              />
              <label className="text-sm text-gray-700">
                I have read and agree to the website
                <a className="text-orange-500 ml-1 underline">
                  terms and conditions.
                </a>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full mt-4 h-10 text-sm bg-[#ff5a00] text-white font-semibold rounded-full hover:bg-orange-600 transition"
            >
              Place Order
            </button>
          </div>
        </form>

        {error && <p className="text-[#ff5a00] mt-4">{error}</p>}
      </div>
    </section>
  );
};

export default Checkout;
