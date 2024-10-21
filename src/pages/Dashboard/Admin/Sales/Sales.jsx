import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import {
  FaArrowDown,
  FaArrowUp,
  FaSearch,
} from 'react-icons/fa';

const Sales = () => {
  const [sales, setSales] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const axiosSecure = useAxiosSecure();

  // Fetch Sales
  useEffect(() => {
    const fetchSales = async () => {
      try {
        const response = await axiosSecure.get('/product');

        const filteredSales = response.data
          .filter(product => product.sold >= 1)
          .sort((a, b) => b.sold - a.sold);

        setSales(filteredSales);
      } catch (error) {
        console.error('Error fetching Sales:', error);
        toast.error('Failed to load Sales.');
      }
    };

    fetchSales();
  }, [axiosSecure]);



  const filteredSales = sales.filter(product => {
    const productName = product.name ? product.name.toLowerCase() : '';
    const productBrand= product.brand ? product.brand.toLowerCase() : '';
    const productSkuString = product.sku ? product.sku.toString() : '';

    return (
      productName.includes(searchTerm.toLowerCase()) || 
      productBrand.includes(searchTerm.toLowerCase()) || 
      productSkuString.includes(searchTerm)
    );
  });

  function getStatusStyle(status) {
    switch (status) {
      case 'Available':
        return { color: '#32CD32', backgroundColor: 'rgba(50, 205, 50, 0)' };
      case 'Out of Stock':
        return { color: 'red', backgroundColor: 'rgba(255, 0, 0, 0)' };
      default:
        return { color: 'blue', backgroundColor: 'rgba(0, 0, 255, 0)' };
    }
  }

  return (
    <section className="container mx-auto px-[0.5rem] py-6 text-sm">
      <div className="relative mb-4">
        {/* Search bar */}
        <div className="relative">
          <div className="absolute left-3 top-3 text-gray-400">
            <FaSearch />
          </div>
          <input
            type="text"
            placeholder="Search Sales by name, brand or SKU"
            className="border p-2 pl-10 pr-10 rounded-full w-full border-slate-300"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-3 top-3 flex items-center text-sm text-gray-400">
            <FaArrowUp className="mr-1" />
            <FaArrowDown />
          </div>
        </div>

        {sales.length > 0 ? (
          <div className="lg:overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-slate-50 shadow-sm">
                <tr>
                  <th className="px-4 py-2 text-start">Image</th>
                  <th className="px-4 py-2 text-start">Name</th>
                  <th className="px-4 py-2 text-start">Last Update</th>
                  <th className="px-4 py-2 text-start">Category</th>
                  <th className="px-4 py-2 text-start">SKU</th>
                  <th className="px-4 py-2 text-start">Brand</th>
                  <th className="px-4 py-2 text-start">Sold</th>
                  <th className="px-4 py-2 text-center">Discount Price</th>
                  <th className="px-4 py-2 text-end">Status</th>
                </tr>
              </thead>
              <tbody>
                {filteredSales.map((product, index) => (
                  <tr key={product._id}>
                    <td className="px-4 py-2 flex items-center gap-2">
                      {index + 1}.{' '}
                      <img
                        src={product.image}
                        alt="Product"
                        className="w-16 h-16 rounded object-fill"
                      />
                    </td>
                    <td className="px-4 py-2 text-start">
                      {product.name || 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-start">
                      {product.updateDate || 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-start">
                      {product.category || 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-start">
                      {product.sku || 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-start">
                      {product.brand || 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-start">
                      {product.sold || 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-center">
                      ৳
                      {product.discountPrice && product.discountPrice > 0
                        ? product.discountPrice
                        : product.price}
                    </td>
                    <td className="p-3 text-end">
                      <span
                        style={{
                          color: getStatusStyle(product.status).color,
                          backgroundColor: getStatusStyle(product.status)
                            .backgroundColor,
                          padding: '8px',
                          borderRadius: '4px',
                        }}
                      >
                        {product.status || 'N/A'}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No sales Sales available</p>
        )}
      </div>
    </section>
  );
};

export default Sales;
