import React, { useEffect, useState, useRef } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure'; // Custom hook for secure Axios instance
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

const Search = () => {
  const [search, setSearch] = useState(''); // For storing search input
  const [searchData, setSearchData] = useState([]); // For storing search results
  const [filteredData, setFilteredData] = useState([]); // For storing filtered search results
  const [categories, setCategories] = useState([]); // Store all categories
  const [selectedCategory, setSelectedCategory] = useState(''); // For selected category
  const [isOpen, setIsOpen] = useState(false); // For handling dropdown visibility
  const [isCategoryOpen, setIsCategoryOpen] = useState(false); // For category dropdown visibility

  const axiosSecure = useAxiosSecure(); // Axios instance
  const navigate = useNavigate();
  const categoryDropdownRef = useRef(null); // To reference the dropdown DOM element

  // Function to handle search input changes
  const handleChange = e => {
    const value = e.target.value;
    setSearch(value); // Update search state
    setIsOpen(!!value); // Open dropdown if there's input, otherwise close it
  };

  // Function to handle Buy Now action
  const handleBuyNow = productId => {
    setIsOpen(false);
    navigate(`/Product/${productId}`);
  };

  // Handle category selection
  const handleCategorySelect = category => {
    setSelectedCategory(category); // Set the selected category
    setIsCategoryOpen(false); // Close the category dropdown
  };

  // Handle outside click to close category modal
  useEffect(() => {
    const handleClickOutside = event => {
      if (
        categoryDropdownRef.current &&
        !categoryDropdownRef.current.contains(event.target)
      ) {
        setIsCategoryOpen(false); // Close category dropdown if clicked outside
      }
    };

    // Add event listener
    document.addEventListener('mousedown', handleClickOutside);

    // Cleanup event listener on unmount
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [categoryDropdownRef]);

  // Fetch products and categories
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        // API call to fetch all products
        const response = await axiosSecure.get('/product');
        const products = response.data;
        setSearchData(products); // Store fetched products in state

        // Extract unique categories from products
        const uniqueCategories = [
          ...new Set(products.map(product => product.category)),
        ];
        setCategories(uniqueCategories); // Store unique categories in state
      } catch (error) {
        console.error('Error fetching product:', error);
      }
    };

    fetchProduct();
  }, [axiosSecure]);

  // Filter products by search input and selected category
  useEffect(() => {
    let filtered = searchData;

    // If a category is selected, filter by category
    if (selectedCategory) {
      filtered = filtered.filter(
        product => product.category === selectedCategory
      );
    }

    // Filter by search input
    if (search) {
      const regex = new RegExp(search, 'i'); // Case-insensitive search
      filtered = filtered.filter(product => product.name.match(regex));
    }

    setFilteredData(filtered); // Update filtered products in state
  }, [search, selectedCategory, searchData]);

  return (
    <section className="relative w-full md:w-[50%]">
      {/* Search Input */}
      <div className="flex justify-center items-center w-full h-10">
        {/* Category Options */}
        <div className="z-20">
          <div className="w-full">
            <button
              onClick={() => setIsCategoryOpen(!isCategoryOpen)}
              className="w-32 flex items-center p-2.5 h-10 bg-white text-[#ff5a00] border rounded-s-full text-center focus:outline-none overflow-hidden"
            >
              <span className="w-full text-gray-700 text-sm hover:text-[#ff5a00]">
                {selectedCategory ? selectedCategory : 'All Categories'}
              </span>
              <span className="float-right">&#9662;</span>
            </button>
            {isCategoryOpen && (
              <div
                ref={categoryDropdownRef} // Ref to the dropdown element
                className="w-1/2 rounded-sm mt-2 p-4 bg-white z-10 absolute left-0 top-full"
              >
                <ul className="listed">
                  {categories.map((category, index) => (
                    <li key={index} className="p-2 hover:bg-gray-100">
                      <button
                        onClick={() => handleCategorySelect(category)}
                        className={`w-full text-left text-sm hover:text-[#ff5a00] ${
                          selectedCategory === category
                            ? 'text-[#ff5a00]'
                            : 'text-gray-700'
                        }`}
                      >
                        {category}
                      </button>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>

        {/* Search Input */}
        <input
          type="text"
          className="w-full h-full pl-4 xl:pr-32 py-2 custom-bg-white border focus:outline-none"
          placeholder="Search product"
          onChange={handleChange}
          value={search}
        />

        {/* Search Button */}
        <button className="text-white min-w-fit w-[30%] h-full px-2 rounded-e-full bg-[#ff5a00] hover:bg-orange-600 transition-all">
          Search
        </button>
      </div>

      {/* Dropdown for Search Results */}
      {isOpen && search && (
        <div className="absolute top-full mt-2 w-full bg-white shadow-lg z-10 max-h-64 overflow-y-auto">
          {filteredData.length > 0 ? (
            filteredData.map(product => (
              <div
                key={product._id}
                className="flex justify-between items-center p-2  px-5 border-b hover:bg-gray-100 hover:text-[#ff5a00] transition-all cursor-pointer"
                onClick={() => handleBuyNow(product._id)}
              >
                {/* Product Image */}
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-12 h-12 mr-3 object-cover"
                />
                {/* Product Info */}
                <p className="text-sm font-medium">{product.name}</p>
                <p className="text-sm text-[#ff5a00]">৳ {product.price}</p>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500 p-2">No products found</p>
          )}
        </div>
      )}
    </section>
  );
};

export default Search;
