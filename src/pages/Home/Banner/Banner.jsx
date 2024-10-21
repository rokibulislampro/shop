import React, { useEffect, useState, useRef } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const Banner = () => {
  const [banners, setBanners] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false); // Error state added
  const axiosSecure = useAxiosSecure();
  const slideInterval = useRef(null);
  const transitionRef = useRef('transform 1s ease-in-out');

  // Preload images function
  const preloadImages = imageUrls => {
    const promises = imageUrls.map(url => {
      return new Promise((resolve, reject) => {
        const img = new Image();
        img.src = url;
        img.onload = resolve;
        img.onerror = reject;
      });
    });
    return Promise.all(promises);
  };

  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axiosSecure.get('/banner');

        // Filter banners based on status ("Active" or "Inactive")
        const activeBanners = response.data
          .filter(b => b.status === 'Active')
          .slice(0, 3);

        if (activeBanners.length === 0) {
          throw new Error('No active banners found');
        }

        // Preload the banner images before setting state
        const imageUrls = activeBanners.map(banner => banner.image);
        await preloadImages(imageUrls);
        setBanners(activeBanners);
      } catch (error) {
        console.error('Error fetching banners:', error);
        setError(true); // Set error state on catch
      } finally {
        setLoading(false); // Stop loading regardless of success or error
      }
    };

    fetchBanners();
  }, [axiosSecure]);

  useEffect(() => {
    const startSlider = () => {
      slideInterval.current = setInterval(() => {
        setCurrentIndex(prevIndex => {
          if (prevIndex === banners.length) {
            transitionRef.current = 'none'; // Temporarily disable transition
            setTimeout(() => {
              setCurrentIndex(1); // Go to second banner immediately after first
              transitionRef.current = 'transform 1s ease-in-out'; // Re-enable transition
            }, 50); // Small delay to ensure smooth transition reset
            return 0; // Reset to 0 temporarily
          }
          return prevIndex + 1;
        });
      }, 5000); // 5 seconds delay between slides
    };

    if (banners.length > 0) {
      startSlider();
      return () => clearInterval(slideInterval.current);
    }
  }, [banners]);

  const renderIndicators = () => (
    <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 flex justify-center mb-4">
      {banners.map((_, index) => (
        <div
          key={index}
          className={`w-2 h-2 rounded-full mx-1.5 ${
            currentIndex === index ? 'bg-[#ff5a00]' : 'bg-[#1e1f29]'
          }`}
        />
      ))}
    </div>
  );

  if (loading) {
    return <LoadingSpinner />; // Show loader until data is fetched or error occurs
  }

  if (error) {
    return <LoadingSpinner />; // Still show loading spinner if there's an error
  }

  return (
    <section className="flex flex-col justify-center items-center relative">
      <div className="slider-container relative w-full h-[250px] lg:h-[450px] overflow-hidden perspective-[1000px]">
        <div
          className="slider-inner"
          style={{
            transform: `rotateY(-${currentIndex * 90}deg)`,
            transition: transitionRef.current,
            transformStyle: 'preserve-3d',
            whiteSpace: 'nowrap',
          }}
        >
          {banners.concat(banners[0]).map((banner, index) => (
            <div
              key={index}
              className="slider-item w-[100%] h-[300px] lg:h-[450px] inline-block absolute top-0 left-0"
              style={{
                backfaceVisibility: 'hidden',
                transform: `rotateY(${index * 90}deg) translateZ(500px)`,
              }}
            >
              <img
                src={banner.image}
                alt={`Inactive Banner ${index}`}
                className="w-[100%] h-full object-fill"
              />
            </div>
          ))}
        </div>
      </div>
      {renderIndicators()}
    </section>
  );
};

export default Banner;
