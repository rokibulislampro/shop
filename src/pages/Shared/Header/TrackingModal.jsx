import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import { FaArrowDown, FaSearch } from 'react-icons/fa';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';
import './Navbar.css';

const TrackingModal = ({ isOpen, onClose }) => {
  const axiosSecure = useAxiosSecure();
  const [orderTrack, setOrderTrack] = useState([]);
  const [loading, setLoading] = useState(true); // Initialize loading to true
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrders, setFilteredOrders] = useState([]);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosSecure.get('/order');
        setOrderTrack(response.data);
      } catch (error) {
        console.error('Error fetching Orders:', error);
        toast.error('Failed to load Orders.');
      } finally {
        setLoading(false); // Stop loading after fetching data
      }
    };
    fetchOrders();
  }, [axiosSecure]);

  const getStepStatus = status => {
    switch (status) {
      case 'Pending':
        return 1;
      case 'Processing':
        return 2;
      case 'Shipped':
        return 3;
      case 'Delivered':
      case 'Canceled':
        return 4;
      default:
        return 0;
    }
  };

  useEffect(() => {
    if (searchTerm.length > 0) {
      const filtered = orderTrack.filter(
        order => order.trackingId.toString() === searchTerm
      );
      setFilteredOrders(filtered);
    } else {
      setFilteredOrders([]);
    }
  }, [searchTerm, orderTrack]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex justify-center items-center z-50">
      <div
        className="fixed inset-0 bg-black opacity-50"
        onClick={onClose}
      ></div>
      <div className="relative bg-white p-4 shadow-lg rounded z-50">
        <button
          type="button"
          className="absolute text-black font-bold right-2 top-2"
          onClick={onClose}
        >
          ✕
        </button>
        <h3 className="font-semibold text-lg text-[#ff5a00] text-center py-2">
          Tracking Your Order
        </h3>

        {/* Search Bar */}
        <div className="relative mb-4">
          <div className="absolute left-3 top-3 text-gray-400">
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder="Enter full tracking ID"
            className="border bg-white p-2 pl-10 pr-10 rounded-full w-full border-slate-300"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-3 top-3 text-sm text-gray-400">
            <FaArrowDown />
          </div>
        </div>

        {loading ? (
          // Custom loader during loading
          <LoadingSpinner />
        ) : filteredOrders.length > 0 ? (
          filteredOrders.map(order => (
            <div key={order._id} className="mb-8 border rounded-md p-4">
              <div className="flex flex-wrap justify-between">
                <div>
                  <p className="font-semibold text-sm">ORDER ID</p>
                  <p className="text-gray-500">#{order.orderId}</p>
                </div>
                <div>
                  <p className="font-semibold text-sm">ORDER PLACED</p>
                  <p className="text-gray-500">{order.orderDetails.date}</p>
                </div>
                <div>
                  <p className="font-semibold text-sm">TOTAL</p>
                  <p className="text-gray-500">
                    ৳{order.orderDetails.grandTotal}
                  </p>
                </div>
                <div>
                  <p className="font-semibold text-sm">SHIP TO</p>
                  <p className="text-gray-500">
                    {order.billingDetails.fullName}
                  </p>
                </div>
              </div>

              <div className="my-5">
                {/* Order Status */}
                <div className="mb-2">
                  <h3 className="font-semibold">
                    Order Status:{' '}
                    <span
                      className={`text-sm ${
                        order.orderDetails.status === 'Delivered'
                          ? 'text-green-500'
                          : order.orderDetails.status === 'Canceled'
                          ? 'text-[#ff5a00]'
                          : 'text-blue-500'
                      }`}
                    >
                      {order.orderDetails.status}
                    </span>{' '}
                    <span className="text-xs">
                      ({order.orderDetails.updateDate})
                    </span>
                  </h3>
                </div>

                {/* Tracking Steps */}
                <div className="flex items-center justify-between">
                  {[
                    'Pending',
                    'Processing',
                    'Shipped',
                    'Delivered',
                    'Canceled',
                  ].map((step, index) => {
                    const stepStatus = getStepStatus(order.orderDetails.status);
                    const isCompleted = index < stepStatus;
                    const isCanceled = order.orderDetails.status === 'Canceled';

                    if (isCanceled && step === 'Delivered') {
                      return null;
                    }

                    if (!isCanceled && step === 'Canceled') {
                      return null;
                    }

                    return (
                      <div className="text-center" key={index}>
                        <div className="flex items-center justify-center gap-0 my-2">
                          <div
                            className={`w-8 h-8 ${
                              isCompleted
                                ? 'bg-green-500'
                                : isCanceled && step === 'Canceled'
                                ? 'bg-[#ff5a00]'
                                : 'bg-gray-300'
                            } text-white rounded-full flex items-center justify-center`}
                          >
                            {(isCompleted ||
                              (isCanceled && step === 'Canceled')) && (
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                className="h-6 w-6"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke="currentColor"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M5 13l4 4L19 7"
                                />
                              </svg>
                            )}
                          </div>
                          {index < 3 && (
                            <div
                              className={`h-1 w-12 md:w-16 ${
                                isCompleted ? 'bg-green-500' : 'bg-gray-300'
                              }`}
                            ></div>
                          )}
                        </div>
                        <p className="text-xs font-semibold text-start">
                          {step}
                        </p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Ordered Products */}
              <div className="mt-6">
                <h4 className="font-semibold">Ordered Products:</h4>
                <ul>
                  {order.orderDetails.products.map(product => (
                    <li key={product.id} className="mt-2">
                      <div className="flex items-center gap-3">
                        <img
                          src={product.image}
                          alt="Product Photo"
                          className="w-16"
                        />
                        <div>
                          <p className="font-semibold text-sm">
                            {product.name}
                          </p>
                          <p className="text-sm text-gray-600">
                            Quantity: {product.quantity} | Price:{' '}
                            {product.price} BDT
                          </p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center my-4">
            No order found with the provided tracking ID.
          </p>
        )}
      </div>
    </div>
  );
};

export default TrackingModal;
