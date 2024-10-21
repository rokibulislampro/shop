import React, { useEffect, useState } from 'react';
import useAxiosSecure from '../../../Hooks/useAxiosSecure';
import HotDealItem from './HotDealItem';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';

const HotDeal = () => {
  const [deals, setDeals] = useState([]);
  const [loading, setLoading] = useState(true);
  const axiosSecure = useAxiosSecure();

  // Function to fetch deal data
  const fetchDeals = async () => {
    try {
      const response = await axiosSecure.get('/deal');
      setDeals(response.data);
    } catch (error) {
      console.error('Error fetching Deal Product:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchDeals(); // Initial data fetch
  }, [axiosSecure]);

  return (
    <section className="bg-slate-100">
      {loading ? (
        <LoadingSpinner />
      ) : (
        deals.map(deal => (
          <HotDealItem
            key={deal._id}
            deal={deal}
            fetchNewDeal={fetchDeals} // Passing fetch function to HotDealItem
          />
        ))
      )}
    </section>
  );
};

export default HotDeal;
