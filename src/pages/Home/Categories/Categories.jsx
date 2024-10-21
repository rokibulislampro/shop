import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { useNavigate } from 'react-router-dom';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

// Custom Arrow components
const NextArrow = ({ onClick }) => (
  <div
    className="absolute right-0 z-10 flex items-center justify-center w-10 h-10 hover:text-white bg-gray-100 hover:bg-[#ff5a00] rounded-full shadow-lg cursor-pointer top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all"
    onClick={onClick}
  >
    &#10095;
  </div>
);

const PrevArrow = ({ onClick }) => (
  <div
    className="absolute left-0 z-10 flex items-center justify-center w-10 h-10 hover:text-white bg-gray-100 hover:bg-[#ff5a00] rounded-full shadow-lg cursor-pointer top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-all"
    onClick={onClick}
  >
    &#10094;
  </div>
);

const Categories = () => {
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
        console.error('Error fetching categories:', error);
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
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    nextArrow: <NextArrow />,
    prevArrow: <PrevArrow />,
    responsive: [
      {
        breakpoint: 1024,
        settings: { slidesToShow: 3 },
      },
      {
        breakpoint: 600,
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
    <section className="p-[0.3rem] xl:mx-[10rem] relative group bg-gradient-to-t from-transparent to-[#f5f5f5]">
      <h2 className="text-xl md:text-2xl p-3 font-semibold">
        Shop By Category{' '}
        <span className="text-sm text-slate-400 font-medium">
          Choose What You Looking For
        </span>
      </h2>
      <div className="w-full flex justify-center items-center relative">
        <div className="w-full">
          <Slider {...settings}>
            {categories.map(category => (
              <div
                key={category._id}
                className="flex flex-col justify-center items-center w-fit mx-auto hover:text-[#ff5a00] transition-all"
                onClick={() => handleCategoryClick(category.category)}
              >
                <img
                  src={category.image}
                  alt={category.category}
                  className="w-32 bg-white rounded-full p-3 h-full shadow-md object-cover m-auto"
                />
                <p className="mt-3 text-md font-semibold text-center">
                  {category.category}
                </p>
              </div>
            ))}
          </Slider>
        </div>
      </div>
    </section>
  );
};

export default Categories;
