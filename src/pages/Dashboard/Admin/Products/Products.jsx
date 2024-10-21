import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import {
  FaArrowDown,
  FaArrowUp,
  FaEdit,
  FaPlusSquare,
  FaSearch,
} from 'react-icons/fa';
import { AiOutlineDelete } from 'react-icons/ai';
import AddProduct from './AddProduct';
import UpdateProduct from './UpdateProduct';
import { toast } from 'react-toastify';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState(''); // Search term state
  const axiosSecure = useAxiosSecure();
  const [showAddPopup, setShowAddPopup] = useState(false);
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(' ');

  // Fetch Products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axiosSecure.get('/product');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error);
        toast.error('Failed to load products.');
      }
    };
    fetchProducts();
  }, [axiosSecure]);

  const filteredProducts = products.filter(product => {
    const productName = product.name ? product.name.toLowerCase() : '';
    const productSkuString = product.sku ? product.sku.toString() : '';

    return (
      productName.includes(searchTerm.toLowerCase()) ||
      productSkuString.includes(searchTerm)
    );
  });

  // Handle Delete Product
  const handleDelete = async productId => {
    try {
      await axiosSecure.delete(`/product/${productId}`); // Corrected the template literal
      setProducts(products.filter(product => product._id !== productId));
      toast.success('Product deleted successfully!');
    } catch (error) {
      toast.error('Failed to delete product.');
      console.error('Error deleting product:', error);
    }
  };

  // Handle Add Product
  const handleAddProduct = async newProduct => {
    try {
      const response = await axiosSecure.post('/product', newProduct);

      // Use functional update for setting products
      setProducts(prevProducts => [...prevProducts, response.data]);

      toast.success('Product added successfully!');
      setTimeout(() => {
        window.location.reload();
      }, 1000);
    } catch (error) {
      toast.error('Failed to add product.');
      console.error('Error adding product:', error);
    }
  };

  // Handle Update Product
  const handleUpdateProduct = async (productId, updatedProduct) => {
    try {
      await axiosSecure.put(`/product/${productId}`, updatedProduct);
      setProducts(
        products.map(product =>
          product._id === productId
            ? { ...updatedProduct, _id: productId }
            : product
        )
      );
      toast.success('Product updated successfully!');
      setShowUpdatePopup(false); // Close the update popup after success
    } catch (error) {
      toast.error('Failed to update product.');
      console.error('Error updating product:', error);
    }
  };

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
            placeholder="Search products by name or SKU"
            className="border p-2 pl-10 pr-10 rounded-full w-full border-slate-300"
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
          />
          <div className="absolute right-3 top-3 flex items-center text-sm text-gray-400">
            <FaArrowUp className="mr-1" />
            <FaArrowDown />
          </div>
        </div>

        {products.length > 0 ? (
          <div className="overflow-x-auto w-full">
            <table className="table-auto w-full text-left whitespace-no-wrap">
              <thead className="bg-slate-50 shadow-sm">
                <tr>
                  <th className="px-4 py-2 text-start">Image</th>
                  <th className="px-4 py-2 text-start">Name</th>
                  <th className="px-4 py-2 text-start">Date</th>
                  <th className="px-4 py-2 text-start">Category</th>
                  <th className="px-4 py-2 text-start">SKU</th>
                  <th className="px-4 py-2 text-start">Brand</th>
                  <th className="px-4 py-2 text-start">Price</th>
                  <th className="px-4 py-2 text-start">Slots</th>
                  <th className="px-4 py-2 text-start">Sold</th>
                  <th className="px-4 py-2 text-start">Status</th>
                  <th className="px-4 py-2 text-start">Update</th>
                  <th className="px-4 py-2 text-start">Delete</th>
                </tr>
              </thead>
              <tbody>
                {filteredProducts.map((product, index) => (
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
                      {product.date || 'N/A'}
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
                      ৳{product.price || 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-start">
                      {product.slots || 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-start">
                      {product.sold || 'N/A'}
                    </td>
                    <td className="p-3">
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
                    <td className="px-4 py-2 text-start">
                      <button
                        className="bg-slate-100 hover:bg-[#1e1d29] hover:text-white transition-all shadow-md p-3.5 rounded-full flex items-center justify-center"
                        onClick={() => {
                          setCurrentProduct(product);
                          setShowUpdatePopup(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                    </td>
                    <td className="px-4 py-2 text-start">
                      <button
                        className="bg-[#ff5a00] hover:bg-orange-600 transition-all text-white font-bold shadow-md p-3.5 rounded-full flex items-center justify-center"
                        onClick={() => handleDelete(product._id)}
                      >
                        <AiOutlineDelete />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No products available</p>
        )}
      </div>

      {/* AddProduct Popup */}
      <div>
        <div
          className="fixed right-5 bottom-5 bg-[#1e1d29] hover:bg-green-600 text-white transition-all shadow-md p-3.5 rounded-full flex items-center justify-center"
          onClick={() => setShowAddPopup(true)}
        >
          <FaPlusSquare />
        </div>
        {showAddPopup && (
          <AddProduct
            onClose={() => setShowAddPopup(false)}
            onAdd={handleAddProduct}
          />
        )}
      </div>

      {/* UpdateProduct Popup */}
      {showUpdatePopup && currentProduct && (
        <UpdateProduct
          product={currentProduct}
          onClose={() => setShowUpdatePopup(false)}
          onUpdate={handleUpdateProduct}
        />
      )}
    </section>
  );
};

export default Products;
