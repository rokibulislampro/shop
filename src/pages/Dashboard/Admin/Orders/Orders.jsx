// Orders.js
import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import {
  FaArrowDown,
  FaArrowUp,
  FaEye,
  FaSearch,
  FaTrash,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import { AiOutlineDelete } from 'react-icons/ai';
import './Orders.css';

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate(); // Initialize navigate

  // Fetch orders from API
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosSecure.get('/order');
        const orders = response.data;

        const formattedOrders = orders.reverse().map(order => {
          const totalQuantity = order.orderDetails.products.reduce(
            (total, product) => total + product.quantity,
            0
          );

          return {
            _id: order._id,
            orderId: order.orderId,
            trackingId: order.trackingId,
            date: order.orderDetails.date,
            time: order.orderDetails.time,
            updateDate: order.orderDetails.updateDate,
            name: order.billingDetails.fullName,
            orders: order.orderDetails.products.length,
            totalQuantity,
            amountSpent: order.orderDetails.total,
            grandTotal: order.orderDetails.grandTotal,
            status: order.orderDetails.status,
            billingDetails: order.billingDetails, // Include billingDetails for detail view
            orderDetails: order.orderDetails, // Include orderDetails for detail view
          };
        });

        setOrders(formattedOrders);
      } catch (error) {
        console.error('Error fetching Orders:', error);
      }
    };

    fetchOrders();
  }, [axiosSecure]);

  // Function to delete an order
  const handleDelete = async orderId => {
    try {
      await axiosSecure.delete(`/order/${orderId}`);
      setOrders(orders.filter(order => order._id !== orderId));
      toast.success('Order deleted successfully!', { autoClose: 3000 });
    } catch (error) {
      toast.error('Failed to delete the order.', { autoClose: 3000 });
      console.error('Error deleting order:', error);
    }
  };

  // Function to get status color and background color
  function getStatusColor(status) {
    switch (status) {
      case 'Delivered':
        return { color: '#32CD32', backgroundColor: 'rgba(50, 205, 50, 0.1)' };
      case 'Pending':
        return { color: 'orange', backgroundColor: 'rgba(255, 165, 0, 0.1)' };
      case 'blue':
        return { color: 'blue', backgroundColor: 'rgba(0, 0, 255, 0.1)' };
      case 'Canceled':
        return { color: 'red', backgroundColor: 'rgba(255, 0, 0, 0.1)' };
      default:
        return { color: 'blue', backgroundColor: 'rgba(0, 0, 255, 0.1)' };
    }
  }

  // Filtering orders based on the search term
  const filteredOrders = orders.filter(
    order =>
      order.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
      order.orderId.toString().includes(searchTerm)
  );

  return (
    <section className="container mx-auto px-[0.5rem] py-6 text-sm">
      {/* Search bar */}
      <div className="relative mb-4">
        <div className="absolute left-3 top-3 text-gray-400">
          <FaSearch />
        </div>
        <input
          type="text"
          placeholder="Search order id or customer name"
          className="border bg-white p-2 pl-10 pr-10 rounded-full w-full border-slate-300"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <div className="absolute right-3 top-3 flex items-center text-sm text-gray-400">
          <FaArrowUp className="mr-1" />
          <FaArrowDown />
        </div>
      </div>

      <div className="overflow-x-auto w-full">
        <table className="table-auto w-full text-left whitespace-no-wrap">
          <thead className="bg-slate-100 shadow-sm">
            <tr>
              <th className="px-3 py-2">Orders Id</th>
              <th className="px-3 py-2">Date</th>
              <th className="px-3 py-2">Customers</th>
              <th className="px-3 py-2">Orders</th>
              <th className="px-3 py-2">Amount</th>
              <th className="px-3 py-2">Grand Total</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2">View</th>
              <th className="px-3 py-2 flex justify-end">Delete</th>
            </tr>
          </thead>
          <tbody>
            {filteredOrders.map((order, index) => (
              <tr key={order._id}>
                <td className="px-3 py-3">
                  {filteredOrders.length - index}.{' '}
                  <span className="font-semibold">#{order.orderId}</span>
                </td>
                <td className="px-3 py-3">{order.date}</td>
                <td className="px-3 py-3">{order.name}</td>
                <td className="px-3 py-3">
                  {order.orders}~{order.totalQuantity}
                </td>
                <td className="px-3 py-3">{order.amountSpent}</td>
                <td className="px-3 py-3">{order.grandTotal}</td>
                <td
                  style={{
                    color: getStatusColor(order.status).color,
                    backgroundColor: getStatusColor(order.status)
                      .backgroundColor,
                    display: 'inline-block',
                    maxWidth: 'fit-content', // Ensure the background color fits the content
                  }}
                  className="px-3 py-1 my-4 rounded"
                >
                  {order.status}
                </td>

                <td className="px-3 py-3">
                  <button
                    className="bg-slate-100 hover:bg-[#1e1d29] hover:text-white transition-all shadow-md p-3.5 rounded-full flex items-center justify-center"
                    onClick={() =>
                      navigate('/dashboard/orderDetails', { state: { order } })
                    }
                  >
                    <FaEye />
                  </button>
                </td>
                <td className="px-3 py-3 flex justify-end">
                  <button
                    className="bg-[#ff5a00] hover:bg-orange-600 transition-all text-white font-bold shadow-md p-3.5 rounded-full flex items-center justify-center"
                    onClick={() => handleDelete(order._id)}
                  >
                    <AiOutlineDelete />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Orders;
