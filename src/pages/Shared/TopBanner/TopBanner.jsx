import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner'; // Import LoadingSpinner

const TopBanner = () => {
  const [offer, setOffer] = useState(null);
  const [loading, setLoading] = useState(true); // Loading state
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchOffers = async () => {
      setLoading(true); // Set loading to true when fetching starts
      try {
        const response = await axiosSecure.get('/banner');
        const inactiveOffers = response.data.filter(
          offer => offer.status === 'Inactive'
        );
        const lastInactiveOffer = inactiveOffers[inactiveOffers.length - 1];
        setOffer(lastInactiveOffer);
      } catch (error) {
        console.error('Error fetching Products:', error);
      } finally {
        setLoading(false); // Set loading to false after data fetch
      }
    };

    fetchOffers();
  }, [axiosSecure]);

  return (
    <section className="xl:mx-[10rem]">
      <div className="w-full h-full">
        {loading ? ( // Show loader while loading
          <LoadingSpinner />
        ) : offer ? (
          <div key={offer._id}>
            <img
              src={offer.image}
              alt="Offer Product Banner"
              className="h-40 w-full object-fill rounded-sm"
            />
          </div>
        ) : (
          <p>No inactive offer available</p>
        )}
      </div>
    </section>
  );
};

export default TopBanner;
