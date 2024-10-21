import React, { useEffect, useState, useContext } from 'react';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { AuthContext } from '../../../../providers/AuthProvider';

const MyOrder = () => {
  const axiosSecure = useAxiosSecure();
  const [orderDetails, setOrderDetails] = useState([]);

  const { user } = useContext(AuthContext);
  const userEmail = user?.email;

  useEffect(() => {
    const fetchOrders = async () => {
      if (!userEmail) {
        return;
      }
      try {
        const response = await axiosSecure.get(`/order/${userEmail}`);
        setOrderDetails(response.data);
      } catch (err) {
        console.error('Error fetching orders:', err);
        toast.error('Failed to load orders!');
      }
    };

    fetchOrders();
  }, [axiosSecure, userEmail]);

  const getStepStatus = status => {
    switch (status) {
      case 'Pending':
        return 1;
      case 'Processing':
        return 2;
      case 'Shipped':
        return 3;
      case 'Delivered':
        return 4;
      case 'Canceled':
        return 4;
      default:
        return 0;
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-[0.5rem] bg-white shadow-md rounded-md">
      <h2 className="text-center text-xl font-semibold my-4">ORDER PAGE</h2>
      <p className="text-sm text-center text-gray-500 mb-6">
        Delivery date is subject to change without advanced notice.
      </p>

      {orderDetails.map(order => (
        <div key={order._id} className="mb-8 border rounded-md p-[0.5rem]">
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
              <p className="text-gray-500">৳{order.orderDetails.grandTotal}</p>
            </div>
            <div>
              <p className="font-semibold text-sm">SHIP TO</p>
              <p className="text-gray-500">{order.billingDetails.fullName}</p>
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
                const isDelivered = order.orderDetails.status === 'Delivered';

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
                    <p className="text-xs font-semibold text-start">{step}</p>
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
                      <p className="font-semibold text-sm">{product.name}</p>
                      <p className="text-sm text-gray-600">
                        Quantity: {product.quantity} | Price: {product.price}{' '}
                        BDT
                      </p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      ))}
    </div>
  );
};

export default MyOrder;
