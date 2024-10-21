import { useState, useEffect } from 'react';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../../firebase/firebase.config';
import { toast } from 'react-toastify';
import './Products.css';

const AddProduct = ({ onClose, onAdd }) => {
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
  const date = formatDateTime(currentDate);

  const generateSku = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let sku = '';
    for (let i = 0; i < 5; i++) {
      sku += chars[Math.floor(Math.random() * chars.length)];
    }
    return sku;
  };

  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    subcategory: '',
    brand: '',
    description: '',
    purchasePrice: '',
    price: '',
    discountPrice: '',
    status: '',
    rating: '',
    date: date,
    slots: '',
    sold: '',
    sku: generateSku(),
    currency: ['$', '৳'], // Default currency icons
    imageFile: null,
  });

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const { currency, name, price, status, imageFile } = newProduct;
    if (currency && name && price && status && imageFile) {
      setIsButtonDisabled(false);
    } else {
      setIsButtonDisabled(true);
    }
  }, [newProduct]);

  const handleChange = e => {
    const { name, value, files } = e.target;
    if (name === 'image') {
      setNewProduct(prevState => ({
        ...prevState,
        imageFile: files[0],
      }));
    } else {
      setNewProduct(prevState => ({
        ...prevState,
        [name]: value,
      }));
    }
  };

  const handleAddProduct = async () => {
    const { name, category, price, status, imageFile } = newProduct;

    // Check if required fields are filled
    if (!name || !category || !price || !status || !imageFile) {
      toast.error('Please fill all required fields.', {
        position: toast.POSITION.TOP_CENTER,
      });
      return; // Stop function execution if fields are missing
    }

    try {
      // Final currency will be an array of both USD and BDT
      const finalCurrency = ['$', '৳'];

      if (newProduct.imageFile) {
        const imageRef = ref(
          storage,
          `product-images/${newProduct.imageFile.name}`
        );
        await uploadBytes(imageRef, newProduct.imageFile);
        const imageUrl = await getDownloadURL(imageRef);

        const productToAdd = {
          ...newProduct,
          image: imageUrl,
          currency: finalCurrency, // Both currencies are posted
        };
        delete productToAdd.imageFile;

        onAdd(productToAdd);
      } else {
        const productToAdd = { ...newProduct, currency: finalCurrency };
        delete productToAdd.imageFile;

        onAdd(productToAdd);
      }

      onClose();
    } catch (error) {
      console.error('Error uploading image:', error);
      toast.error('Failed to add product.', {
        position: toast.POSITION.TOP_CENTER,
      });
    }
  };

  return (
    <section className="p-[1rem] fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded-lg shadow-lg w-fit justify-center items-center text-sm">
        <h2 className="text-xl font-semibold w-full">Add New Product</h2>

        <div className="flex items-center gap-3 my-3 w-full">
          <div className="flex w-full gap-4">
            <div className="w-full">
              <input
                type="text"
                name="name"
                value={newProduct.name}
                onChange={handleChange}
                placeholder="Name"
                required
                className="w-full p-3 px-5 border rounded-full input-field"
              />
            </div>
            <div className="w-full mt-2 md:mt-0">
              <input
                type="text"
                name="category"
                value={newProduct.category}
                onChange={handleChange}
                placeholder="Category"
                required
                className="w-full p-3 px-5 border rounded-full input-field"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 my-3">
          <div className="flex w-full gap-4">
            <div className="w-full">
              <input
                type="text"
                name="subcategory"
                value={newProduct.subcategory}
                onChange={handleChange}
                placeholder="Subcategory"
                className="w-full p-3 px-5 border rounded-full input-field"
              />
            </div>
            <div className="w-full mt-2 md:mt-0">
              <input
                type="text"
                name="brand"
                value={newProduct.brand}
                onChange={handleChange}
                placeholder="Brand"
                className="w-full p-3 px-5 border rounded-full input-field"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 my-3">
          <div className="flex w-full gap-4">
            <div className="w-full">
              <input
                type="number"
                name="purchasePrice"
                value={newProduct.purchasePrice}
                onChange={handleChange}
                placeholder="Purchase Price"
                className="w-full p-3 px-5 border rounded-full input-field"
              />
            </div>
            <div className="w-full mt-2 md:mt-0">
              <input
                type="number"
                name="price"
                value={newProduct.price}
                onChange={handleChange}
                placeholder="Regular Price"
                required
                className="w-full p-3 px-5 border rounded-full input-field"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 my-3">
          <div className="flex w-full gap-4">
            <div className="w-full">
              <input
                type="number"
                name="discountPrice"
                value={newProduct.discountPrice}
                onChange={handleChange}
                placeholder="Discount Price"
                className="w-full p-3 px-5 border rounded-full input-field"
              />
            </div>
            <div className="w-full mt-2 md:mt-0">
              <input
                type="number"
                name="slots"
                value={newProduct.slots}
                onChange={handleChange}
                placeholder="Slots"
                className="w-full p-3 px-5 border rounded-full input-field"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 my-3">
          <div className="flex w-full gap-4">
            <div className="w-full">
              <select
                name="status"
                value={newProduct.status}
                onChange={handleChange}
                required
                className="w-full p-3 px-5 border rounded-full input-field"
              >
                <option value="" disabled>
                  Select Status
                </option>{' '}
                {/* Placeholder option */}
                <option value="Available">Available</option>
                <option value="Out of Stock">Out of Stock</option>
              </select>
            </div>
            <div className="w-full mt-2 md:mt-0">
              <input
                type="number"
                name="rating"
                value={newProduct.rating}
                onChange={handleChange}
                placeholder="Rating (1~5)"
                className="w-full p-3 px-5 border rounded-full input-field"
              />
            </div>
          </div>
        </div>
        <div className="flex items-center gap-3 my-3">
          <div className="flex w-full gap-4">
            <div className="w-full">
              <input
                type="file"
                name="image"
                onChange={handleChange}
                placeholder="Upload Image"
                multiple
                className="w-full p-3 px-5 border rounded-full input-field"
              />
            </div>
            <div className="w-full mt-2 md:mt-0">
              <textarea
                name="description"
                value={newProduct.description}
                onChange={handleChange}
                placeholder="Type product details..."
                className="w-full p-1 px-5 border rounded-full input-field flex items-center"
              />
            </div>
          </div>
        </div>

        <div className="w-full flex justify-end items-center gap-3">
          <button
            className="bg-[#1d1e29] hover:bg-black text-white px-8 py-3 rounded-full font-semibold transition-all"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="bg-[#ff5a00] hover:bg-green-500 text-white px-6 py-3 rounded-full font-semibold transition-all"
            onClick={handleAddProduct}
            disabled={isButtonDisabled}
          >
            Add Product
          </button>
        </div>
      </div>
    </section>
  );
};

export default AddProduct;
