import { useEffect, useState } from 'react';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
import { FaEdit } from 'react-icons/fa';
import { toast } from 'react-toastify';
import UpdateDeals from './UpdateDeals';
import useCountdown from '../../../../Hooks/useCountdown';

const Deal = ({ fetchNewDeal }) => {
  const [deal, setDeal] = useState([]);
  const [endTime, setEndTime] = useState(null);
  const axiosSecure = useAxiosSecure();
  const [showUpdatePopup, setShowUpdatePopup] = useState(false);
  const [currentDeal, setCurrentDeal] = useState(null);

  // Fetch Deal
  useEffect(() => {
    const fetchDeal = async () => {
      try {
        const response = await axiosSecure.get('/deal');
        setDeal(response.data);
        setEndTime(response.data?.[0]?.endTime);
      } catch (error) {
        console.error('Error fetching Deal:', error);
        toast.error('Failed to load Deal.');
      }
    };
    fetchDeal();
  }, [axiosSecure]);

  // Handle Update deal
  const handleUpdateDeal = async (dealId, updatedDeal) => {
    try {
      await axiosSecure.put(`/deal/${dealId}`, updatedDeal);
      setDeal(
        deal.map(d => (d._id === dealId ? { ...updatedDeal, _id: dealId } : d))
      );
      toast.success('Deal updated successfully!');
      setShowUpdatePopup(false);
    } catch (error) {
      toast.error('Failed to update deal.');
      console.error('Error updating deal:', error);
    }
  };

  // UseCountdown hook for countdown
  const { days, hours, minutes, seconds } = useCountdown(endTime, fetchNewDeal);

  // Reset countdown
  const resetCountdown = async dealId => {
    try {
      const newEndTime = new Date(
        Date.now() + deal?.[0]?.day * 24 * 60 * 60 * 1000
      ).toISOString();

      const response = await axiosSecure.put(`/deal/${dealId}`, {
        endTime: newEndTime,
      });

      if (response.data) {
        setEndTime(newEndTime);
        fetchNewDeal();
        toast.success('Countdown reset successfully!');
      }
    } catch (error) {
      console.error('Error resetting deal time:', error);
      toast.success('Countdown reset successfully!');
    }
  };

  return (
    <section className="text-sm">
      <div className="p-[1rem]">
        <h2 className="font-semibold">Hot Deal:</h2>
        {deal.length > 0 ? (
          <div className="lg:overflow-x-auto">
            <table className="min-w-full table-auto border-collapse">
              <thead className="bg-slate-50 shadow-sm">
                <tr>
                  <th className="px-4 py-2 text-start">Video</th>
                  <th className="px-4 py-2 text-start">Image</th>
                  <th className="px-4 py-2 text-start hidden md:table-cell">
                    Name
                  </th>
                  <th className="px-4 py-2 text-start hidden md:table-cell">
                    Offer
                  </th>
                  <th className="px-4 py-2 text-start hidden md:table-cell">
                    Last Update
                  </th>
                  <th className="px-4 py-2 text-center">Link</th>
                  <th className="px-4 py-2 text-center">Day</th>
                  <th className="px-4 py-2 text-center">Edit</th>
                  <th className="px-4 py-2 text-center">Reset</th>
                </tr>
              </thead>
              <tbody>
                {deal.map((d, index) => (
                  <tr key={d._id}>
                    <td className="px-4 py-2 flex items-center gap-2">
                      {index + 1}.{' '}
                      <video
                        src={d.video}
                        autoPlay
                        loop
                        muted
                        className="w-16 md:w-32 h-16 rounded object-fill"
                      ></video>
                    </td>
                    <td className="px-4 py-2">
                      <img
                        src={d.image}
                        alt="deal"
                        className="w-16 md:w-32 h-16 rounded object-fill"
                      />
                    </td>
                    <td className="px-4 py-2 text-start hidden md:table-cell">
                      {d.name || 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-start hidden md:table-cell">
                      {d.offer || 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-start hidden md:table-cell">
                      {d.updateDate || 'N/A'}
                    </td>
                    <td className="px-4 py-2 text-start">
                      {d.link ? (
                        <a
                          href={d.link}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="text-blue-600 hover:underline"
                        >
                          Link
                        </a>
                      ) : (
                        'N/A'
                      )}
                    </td>
                    <td className="px-4 py-2 text-center">{d.day || 'N/A'}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        className="bg-slate-100 hover:bg-[#1e1d29] hover:text-white transition-all shadow-md p-3.5 rounded-full flex items-center justify-center"
                        onClick={() => {
                          setCurrentDeal(d);
                          setShowUpdatePopup(true);
                        }}
                      >
                        <FaEdit />
                      </button>
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        className="w-fit bg-[#1e1f29] hover:bg-[#ff5a00] text-white text-sm font-semibold py-2 px-4 rounded-full transition-all"
                        onClick={() => resetCountdown(d._id)}
                      >
                        Reset
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
            <div className="mt-5">
              <div className="flex justify-center space-x-3">
                <div className="text-white bg-[#ff5a00] text-center rounded-full py-2 px-3">
                  <h3 className="text-2xl font-bold">{days}</h3>
                  <p className="text-xs">DAYS</p>
                </div>
                <div className="text-white bg-[#ff5a00] text-center rounded-full py-2 px-3">
                  <h3 className="text-2xl font-bold">{hours}</h3>
                  <p className="text-xs">HOURS</p>
                </div>
                <div className="text-white bg-[#ff5a00] text-center rounded-full py-2 px-3">
                  <h3 className="text-2xl font-bold">{minutes}</h3>
                  <p className="text-xs">MINS</p>
                </div>
                <div className="text-white bg-[#ff5a00] text-center rounded-full py-2 px-3">
                  <h3 className="text-2xl font-bold">{seconds}</h3>
                  <p className="text-xs">SECS</p>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <p>No deal available</p>
        )}
      </div>

      {showUpdatePopup && currentDeal && (
        <UpdateDeals
          deal={currentDeal}
          onClose={() => setShowUpdatePopup(false)}
          onUpdate={handleUpdateDeal}
        />
      )}
    </section>
  );
};

export default Deal;
