import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const NewOffer = () => {
  const [offer, setOffer] = useState(null); 
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  useEffect(() => {
    const fetchOffers = async () => {
      try {
        const response = await axiosSecure.get('/banner');
        const inactiveOffer = response.data.find(
          offer => offer.status === 'Inactive'
        );
        setOffer(inactiveOffer);
      } catch (error) {
        console.error('Error fetching offers:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchOffers();
  }, [axiosSecure]);

  return (
    <section>
      <div className="w-full h-full">
        {loading ? (
          <LoadingSpinner />
        ) : offer ? (
          <div key={offer._id}>
            <img
              src={offer.image}
              alt="Offer Product Banner"
              className="h-48 w-full object-fill"
            />
          </div>
        ) : (
          <p>No inactive offer available</p>
        )}
      </div>
    </section>
  );
};

export default NewOffer;
