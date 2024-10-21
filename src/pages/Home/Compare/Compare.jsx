import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const Compare = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axiosSecure.get('/product');
        const categoryMap = new Map();

        response.data.forEach(product => {
          if (!categoryMap.has(product.category)) {
            categoryMap.set(product.category, product);
          }
        });

        const uniqueCategories = Array.from(categoryMap.values());
        setCategories(uniqueCategories);
      } catch (error) {
        console.error('Error fetching Categories:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [axiosSecure]);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 768,
        settings: { slidesToShow: 2 },
      },
    ],
  };

  const handleCategoryClick = category => {
    navigate(`/shop/${category}`);
  };

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <section className="p-[1.7rem] xl:mx-[10rem] group">
      <div className="w-full flex justify-center items-center relative">
        <div className="w-full">
          <Slider {...settings}>
            {categories.slice(0, 5).map(category => (
              <div
                key={category._id}
                className="relative flex flex-col p-1.5 md:p-3 justify-center items-center h-44 md:h-56 w-full mx-auto transition-all cursor-pointer"
              >
                {/* Image with a grey background */}
                <div className="relative w-full h-full overflow-hidden">
                  <img
                    src={category.image}
                    alt={category.category}
                    className="w-full h-44 md:h-56 object-cover bg-gray-200 transform transition-transform duration-300 hover:scale-110"
                  />
                  {/* Left red overlay with bent style */}
                  <div className="opacity-90 h-full">
                    <div className="absolute inset-0 bg-[#ff5a00] opacity w-full clip-path-left transition-opacity"></div>
                    {/* Right red overlay with bent style */}
                    <div className="absolute inset-0 bg-[#ff5a00] opacity w-full clip-path-right transition-opacity"></div>
                  </div>
                  {/* Category title and Shop Now button */}
                  <div className="absolute top-1/4 left-1/4 transform -translate-x-1/3 -translate-y-1/3 text-white">
                    <h2 className="text-lg md:text-xl font-semibold">
                      {category.category} <br /> Collection
                    </h2>
                    <button
                      className="mt-2 text-sm md:text-md text-white flex items-center button-hover"
                      onClick={() => handleCategoryClick(category.category)}
                    >
                      Shop Now <span className="ml-1">➔</span>
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Compare;
