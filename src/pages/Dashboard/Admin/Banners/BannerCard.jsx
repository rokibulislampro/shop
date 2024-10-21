import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import {
  FaEdit,
} from 'react-icons/fa';
import { toast } from 'react-toastify';
import UpdateBanner from './UpdateBanner';

const BannerCard = () => {
  const [banners, setBanners] = useState([]);
  const axiosSecure = useAxiosSecure();
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [currentBanner, setCurrentBanner] = useState(' ');

  // Fetch Banners
  useEffect(() => {
    const fetchBanners = async () => {
      try {
        const response = await axiosSecure.get('/banner');
        setBanners(response.data);
      } catch (error) {
        console.error('Error fetching Banners:', error);
        toast.error('Failed to load Banners.');
      }
    };
    fetchBanners();
  }, [axiosSecure]);

  
  // Handle Update Banner
  const handleUpdateBanner = async (bannerId, updatedBanner) => {
    try {
      await axiosSecure.put(`/banner/${bannerId}`, updatedBanner);
      setBanners(
        banners.map(banner =>
          banner._id === bannerId
            ? { ...updatedBanner, _id: bannerId }
            : banner
        )
      );
      toast.success('Banner updated successfully!');
      setShowUpdatePopup(false); // Close the update popup after success
    } catch (error) {
      toast.error('Failed to update Banner.');
      console.error('Error updating Banner:', error);
    }
  };

  function getStatusStyle(status) {
    switch (status) {
      case 'Active':
        return { color: 'blue', backgroundColor: 'rgba(0, 0, 255, 0)' };
      case 'Inactive':
        return { color: 'red', backgroundColor: 'rgba(255, 0, 0, 0)' };
      default:
        return { color: 'blue', backgroundColor: 'rgba(0, 0, 255, 0)' };
    }
  }

  return (
    <section className="container mx-auto px-[0.5rem] py-6 text-sm">
      <div className="relative">
        <h2 className="font-semibold">All Banner:</h2>
        {banners.length > 0 ? (
          <div className="lg:overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-slate-50 shadow-sm">
                <tr>
                  <th className="px-4 py-2 text-start">Image</th>
                  <th className="px-4 py-2 text-start">Name</th>
                  <th className="px-4 py-2 text-start">Last Update</th>
                  <th className="px-4 py-2 text-start">Status</th>
                  <th className="px-4 py-2 text-start">Edit</th>
                </tr>
              </thead>
              <tbody>
                {banners.map((banner, index) => (
                  <tr key={banner._id}>
                    <td className="px-4 py-2 flex items-center gap-2">
                      {index + 1}.{' '}
                      <img
                        src={banner.image}
                        alt="banner"
                        className="w-16 md:w-32 h-16 rounded object-fill"
                      />
                    </td>
                    <td className="px-4 py-2 text-start">
                      {banner.name || 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-start">
                      {banner.updateDate || 'N/A'}
                    </td>
                    <td className="p-3">
                      <span
                        style={{
                          color: getStatusStyle(banner.status).color,
                          backgroundColor: getStatusStyle(banner.status)
                            .backgroundColor,
                          padding: '8px',
                          borderRadius: '4px',
                        }}
                      >
                        {banner.status || 'N/A'}
                      </span>
                    </td>
                    <td className="px-4 py-2 text-start">
                      <button
                        className="bg-slate-100 hover:bg-[#1e1d29] hover:text-white transition-all shadow-md p-3.5 rounded-full flex items-center justify-center"
                        onClick={() => {
                          setCurrentBanner(banner);
                          setShowUpdatePopup(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p>No banners available</p>
        )}
      </div>

      {/* UpdateBanner Popup */}
      {showUpdatePopup && currentBanner && (
        <UpdateBanner
          banner={currentBanner}
          onClose={() => setShowUpdatePopup(false)}
          onUpdate={handleUpdateBanner}
        />
      )}
    </section>
  );
};

export default BannerCard;
