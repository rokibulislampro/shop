import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import { FaArrowDown, FaArrowUp, FaSearch } from 'react-icons/fa';
import './Customers.css'

const Customers = () => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState(''); // State for search input
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        const response = await axiosSecure.get('/order');
        const orders = response.data;

        // Formatting the customer data
        const formattedCustomers = orders.reverse().map(order => {
          const totalQuantity = order.orderDetails.products.reduce(
            (total, product) => total + product.quantity,
            0
          );

          return {
            name: order.billingDetails.fullName,
            email: order.billingDetails.email,
            phone: order.billingDetails.phone,
            address: `${order.billingDetails.address}, ${order.billingDetails.district}`,
            orders: order.orderDetails.products.length,
            totalQuantity,
            amountSpent: order.orderDetails.total,
            status: order.orderDetails.status,
            type: order.orderDetails.type,
          };
        });

        setCustomers(formattedCustomers);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching customers:', error);
        setLoading(false);
      }
    };

    fetchCustomers();
  }, [axiosSecure]);

  // Function to get status color and background color
  function getStatusStyle(status) {
    switch (status) {
      case 'Completed':
        return { color: '#32CD32', backgroundColor: 'rgba(50, 205, 50, 0.2)' };
      case 'Pending':
        return { color: 'orange', backgroundColor: 'rgba(255, 165, 0, 0.2)' };
      case 'Processing':
        return { color: 'green', backgroundColor: 'rgba(0, 128, 0, 0.2)' };
      case 'Canceled':
        return { color: 'red', backgroundColor: 'rgba(255, 0, 0, 0.2)' };
      default:
        return { color: 'blue', backgroundColor: 'rgba(0, 0, 255, 0.2)' };
    }
  }

  // Function to get type color
  function getTypeStyle(type) {
    switch (type) {
      case 'Organic':
        return { color: '#32CD32', backgroundColor: 'rgba(50, 205, 50, 0.2)' };
      case 'Real':
        return { color: 'green', backgroundColor: 'rgba(0, 128, 0, 0.2)' };
      case 'Fake':
        return { color: 'red', backgroundColor: 'rgba(255, 0, 0, 0.2)' };
      case 'Undefined':
        return { color: 'orange', backgroundColor: 'rgba(255, 165, 0, 0.2)' };
      default:
        return { color: 'blue', backgroundColor: 'rgba(0, 0, 255, 0.2)' };
    }
  }

  // Filtering customers based on the search term
  const filteredCustomers = customers.filter(customer =>
    customer.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="container mx-auto px-[0.5rem] py-6 text-sm">
      {/* Search bar */}
      <div className="relative mb-4">
        <div className="absolute left-3 top-3 text-gray-400">
          <FaSearch />
        </div>
        <input
          type="text"
          placeholder="Search customer name"
          className="border p-2 pl-10 pr-10 rounded-full w-full border-slate-300"
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)} // Update inputValue on input change
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
              <th className="px-3 py-2">Customers</th>
              <th className="px-3 py-2">Email</th>
              <th className="px-3 py-2">Phone</th>
              <th className="px-3 py-2">Location</th>
              <th className="px-3 py-2">Orders</th>
              <th className="px-3 py-2">Spent</th>
              <th className="px-3 py-2">Status</th>
              <th className="px-3 py-2 flex justify-end">Type</th>
            </tr>
          </thead>
          <tbody>
            {filteredCustomers.map((customer, index) => (
              <tr key={index}>
                <td className="p-3 flex items-center gap-2">
                  {filteredCustomers.length - index}.{' '}
                  <span className="font-medium">{customer.name}</span>{' '}
                </td>
                <td className="p-3">{customer.email}</td>
                <td className="p-3">{customer.phone}</td>
                <td className="p-3">{customer.address}</td>
                <td className="p-3">
                  {customer.orders}~{customer.totalQuantity}
                </td>
                <td className="p-3">৳{customer.amountSpent}</td>
                <td className="p-3">
                  <span
                    style={{
                      color: getStatusStyle(customer.status).color,
                      backgroundColor: getStatusStyle(customer.status)
                        .backgroundColor,
                      padding: '8px',
                      borderRadius: '4px',
                    }}
                  >
                    {customer.status}
                  </span>
                </td>

                <td className="p-3 flex justify-end">
                  <span
                    style={{
                      color: getTypeStyle(customer.type).color,
                      backgroundColor: getTypeStyle(customer.type)
                        .backgroundColor,
                      padding: '5px',
                      borderRadius: '4px',
                    }}
                  >
                    {customer.type}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Customers;
