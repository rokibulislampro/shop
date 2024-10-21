import React, { useState, useRef } from 'react';
import { FaEdit } from 'react-icons/fa';
import { Link, useLocation } from 'react-router-dom';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import printJS from 'print-js';
import './Orders.css';

const OrderDetails = () => {
  const location = useLocation();
  const { order } = location.state;
  const [isEditing, setIsEditing] = useState(false);
  const [status, setStatus] = useState(order?.orderDetails?.status || '');
  const [type, setType] = useState(order?.orderDetails?.type || '');
  const axiosSecure = useAxiosSecure();
  const pdfRef = useRef(); // Reference for the PDF content

  const handleEditClick = () => {
    setIsEditing(true);
  };

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

  const currentDate = new Date();
  const updateDate = formatDateTime(currentDate);

  const handleSaveClick = async () => {
    try {
      const response = await axiosSecure.put(`/order/${order._id}`, {
        status,
        type,
        updateDate,
      });
      if (response.status === 200) {
        toast.success('Updated successfully!');

        // Create a new order object with updated details
        const updatedOrder = {
          ...order,
          orderDetails: {
            ...order.orderDetails,
            status,
            type,
            updateDate,
          },
        };

        // Update the state with the new order object
        setStatus(updatedOrder.orderDetails.status);
        setType(updatedOrder.orderDetails.type);
        order.orderDetails.status = updatedOrder.orderDetails.status;
        order.orderDetails.type = updatedOrder.orderDetails.type;
        setIsEditing(false);
      }
    } catch (error) {
      toast.error('Failed to update status.');
    }
  };

  const downloadPDF = () => {
    printJS({
      printable: pdfRef.current,
      type: 'html',
      css: 'style.css',
      targetStyles: ['*'],
      style: '@page { size: A4; margin: 20mm; }',
      documentTitle: 'Order Invoice',
    });
  };

  return (
    <section className="container mx-auto p-6 lg:p-[3rem] lg:px-[10rem]">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-4">
          <Link to="/dashboard/orders">
            <span className="border shadow  bg-white hover:bg-[#ff5a00] hover:text-white p-1.5 px-2.5 font-bold rounded transition-all">
              &#8592;
            </span>
          </Link>
          <div>
            <p className="text-[#ff5a00] text-xs font-semibold">
              Order / Order Details
            </p>
            <h2 className="font-semibold">Order: #{order.orderId}</h2>
          </div>
        </div>
        <h3 className="text-lg font-semibold">INVOICE</h3>
      </div>

      {/* Part-1 */}
      <div className="space-y-2 border rounded p-3 shadow w-full my-5">
        <div className="flex justify-between items-start">
          <div className="md:flex items-center gap-4 md:text-lg font-semibold text-gray-700">
            <h3>
              OrderID: <span className="text-md">{order.orderId}</span>
            </h3>
            <h3>
              TrackingID: <span className="text-md">{order.trackingId}</span>
            </h3>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-3">
              {!isEditing ? (
                <button
                  onClick={handleEditClick}
                  className="bg-slate-100 hover:bg-[#1e1d29] hover:text-white transition-all shadow-md p-3.5 rounded-full flex items-center justify-center"
                >
                  <FaEdit />
                </button>
              ) : (
                <>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="bg-[#ff5a00] hover:bg-orange-600 rounded-full px-4 p-2 text-white text-sm transition-all"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleSaveClick}
                    className="bg-green-500 hover:bg-green-700 rounded-full px-4 p-2 text-white text-sm transition-all"
                  >
                    Save
                  </button>
                </>
              )}
            </div>
            <button
              className="bg-[#1e1f29] hover:bg-[#ff5a00] rounded px-4 p-2 text-white text-sm transition-all"
              onClick={downloadPDF}
            >
              Download
            </button>
          </div>
        </div>
        <div className="flex items-center gap-4">
          {!isEditing ? (
            <p className="text-indigo-400 bg-indigo-50 text-xs font-semibold w-fit rounded p-1 px-4">
              {order.orderDetails.status}
            </p>
          ) : (
            <select
              value={status}
              onChange={e => setStatus(e.target.value)}
              className="text-indigo-400 bg-indigo-50 text-xs font-semibold w-fit rounded p-1 px-4"
            >
              <option value="Pending">Pending</option>
              <option value="Processing">Processing</option>
              <option value="Shipped">Shipped</option>
              <option value="Delivered">Delivered</option>
              <option value="Canceled">Canceled</option>
            </select>
          )}

          {!isEditing ? (
            <p className="text-orange-400 bg-orange-50 text-xs font-semibold w-fit rounded p-1 px-4">
              {order.orderDetails.type}
            </p>
          ) : (
            <select
              value={type}
              onChange={e => setType(e.target.value)}
              className="text-indigo-400 bg-indigo-50 text-xs font-semibold w-fit rounded p-1 px-4"
            >
              <option value="Undefined">Undefined</option>
              <option value="Real">Real</option>
              <option value="Organic">Organic</option>
              <option value="Fake">Fake</option>
            </select>
          )}
        </div>
        <div className="flex items-center text-xs gap-3">
          <p className="bg-gray-100 shadow-sm p-1 px-2 rounded-sm">
            Placed On: {order.date} {order.time}
          </p>
          <p className="bg-gray-100 shadow-sm p-1 px-2 rounded-sm">
            Updated: {order.updateDate}
          </p>
        </div>
      </div>

      <div className="space-y-4 mt-5 invoice" ref={pdfRef}>
        <div className="w-full text-sm text-end">
          <div className="flex justify-between items-start">
            <div className="flex flex-col text-start">
              <h4 className="font-semibold">
                Order Id: <span className="text-md">{order.orderId}</span>
              </h4>
              <span className="text-indigo-400">
                {order.orderDetails.status}
              </span>
              <span>{order.updateDate}</span>
            </div>
            <h2 className="font-semibold font-serif text-2xl mb-2">dreamBuy</h2>
          </div>
          <div className="space-y-2 text-gray-900 w-full flex flex-col">
            <span className="text-gray-900 w-full font-semibold">
              dreambuy.com
            </span>
            <span className="text-gray-900 w-full">0960000000</span>
            <span className="text-gray-900 w-full">1216 Mirpur, Dhaka</span>
            <span className="text-gray-900 w-full">Bangladesh</span>
          </div>
        </div>
        <hr />
        {/* Part-2 */}
        <div className="w-full text-sm">
          <h2 className="font-semibold text-sm mb-2">
            Customer & Shipping Add.
          </h2>
          <div className="space-y-2">
            <div className="flex w-full">
              <span className="text-gray-900 w-full">
                {order.billingDetails.fullName}
              </span>
            </div>
            <div className="flex w-full">
              <span className="text-gray-900 w-full">
                {order.billingDetails.email}
              </span>
            </div>
            <div className="flex w-full">
              <span className="text-gray-900 w-full">
                {order.billingDetails.phone}
              </span>
            </div>
            <div className="flex w-full">
              <span className="text-gray-900 w-full">
                {order.orderDetails.paymentMethod}
              </span>
            </div>
            <div className="flex w-full">
              <span className="text-gray-900 w-full">
                {order.billingDetails.address}, {order.billingDetails.district},{' '}
                {order.billingDetails.country}
              </span>
            </div>
            <div className="flex w-full">
              <span className="text-gray-900 w-full">
                Placed On: {order.date} {order.time}
              </span>
            </div>
            <hr />
            <div className="flex w-full my-5">
              <span className="flex w-full">
                Additional Info : {order.billingDetails.additionalInfo}
              </span>
            </div>
          </div>
        </div>

        {/* Part-3 */}
        <div className="space-y-2 w-full">
          <h2 className="font-semibold text-lg">Products Ordered</h2>
          <table className="table-full w-full text-left whitespace-no-wrap">
            <thead className="w-full">
              <tr className="text-sm">
                <th className="px-2 py-2">Product</th>
                <th className="px-2 py-2">SKU</th>
                <th className="px-2 py-2 hidden md:block">Category</th>
                <th className="px-2 py-2 text-center">Quantity</th>
                <th className="px-2 py-2 text-end">Price</th>
                <th className="px-2 py-2 text-end">Subtotal</th>
              </tr>
            </thead>
            <tbody>
              {order.orderDetails.products.map(product => (
                <tr key={product._id} className="text-sm">
                  <td className="px-2 py-2 flex items-center gap-2">
                    {/* {filteredproducts.length - index}.{' '} */}
                    <img
                      src={product.image}
                      className="w-10 rounded-sm"
                      alt="Product Photo"
                    />
                    <span className="font-semibold text-sm">
                      {product.name}
                    </span>
                  </td>
                  <td className="px-2 py-2">{product.sku}</td>
                  <td className="px-2 py-2 hidden md:block">
                    {product.category}
                  </td>
                  <td className="px-2 py-2 text-center">{product.quantity}</td>
                  <td className="px-2 py-2 text-end">৳{product.price}</td>
                  <td className="px-2 py-2 text-end">
                    ৳{product.price * product.quantity}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <hr className="py-1" />
          <h3 className="flex justify-between items-center px-3 text-sm font-semibold w-full">
            Total <span>৳{order.orderDetails.total}</span>
          </h3>
          <hr className="py-1" />
          <h3 className="flex justify-between items-center px-3 text-sm font-semibold">
            Delivery Charge <span>৳{order.orderDetails.deliveryCharge}</span>
          </h3>
          <hr className="py-1" />
          <h3 className="flex justify-end items-center px-3 text-lg gap-2 font-bold">
            Grand Total ~ <span>৳{order.orderDetails.grandTotal}</span>
          </h3>
        </div>
      </div>
    </section>
  );
};

export default OrderDetails;
