import React from 'react';
import { Link } from 'react-router-dom';
import useCountdown from '../../../Hooks/useCountdown';

const HotDealItem = ({ deal, fetchNewDeal }) => {
  // Pass fetchNewDeal to useCountdown hook to refetch deal when countdown reaches zero
  const { days, hours, minutes, seconds } = useCountdown(
    deal.endTime,
    fetchNewDeal
  );

  return (
    <section className="m-[0.5rem] xl:m-[5rem] space-y-5 py-6 lg:py-12 grid md:grid-none md:flex justify-center md:justify-between items-center">
      {/* Left Section - Product Video */}
      <video
        src={deal.video}
        controls
        autoPlay
        loop
        muted
        controlsList="nodownload"
        className=" object-fill w-[30rem] h-[12rem] md:h-[16rem] lg:min-h-[20rem] rounded-sm"
      ></video>

      {/* Center Section - Countdown */}
      <div className="flex flex-col text-center space-y-4">
        <div className="flex justify-center space-x-3">
          <div className="text-white bg-[#ff5a00] rounded-full py-3 px-5">
            <h3 className="text-2xl font-bold">{days}</h3>
            <p className="text-xs">DAYS</p>
          </div>
          <div className="text-white bg-[#ff5a00] rounded-full py-3 px-5">
            <h3 className="text-2xl font-bold">{hours}</h3>
            <p className="text-xs">HOURS</p>
          </div>
          <div className="text-white bg-[#ff5a00] rounded-full py-3 px-5">
            <h3 className="text-2xl font-bold">{minutes}</h3>
            <p className="text-xs">MINS</p>
          </div>
          <div className="text-white bg-[#ff5a00] rounded-full py-3 px-5">
            <h3 className="text-2xl font-bold">{seconds}</h3>
            <p className="text-xs">SECS</p>
          </div>
        </div>
        <h2 className="text-3xl font-bold mt-2">{deal.name}</h2>
        <p className="text-gray-600">{deal.offer}</p>
        <Link to={deal.link}>
          <button className="bg-[#ff5a00] hover:bg-[#15161d] mt-2 text-sm text-white px-9 py-2 rounded-full font-semibold transition-all">
            SHOP NOW
          </button>
        </Link>
      </div>

      {/* Right Section - Product Image */}
      <img
        src={deal.image}
        alt={deal.name}
        className="object-fill w-full md:w-[20rem] h-[12rem] md:h-[16rem] lg:min-h-[20rem] rounded-sm"
      />
    </section>
  );
};

export default HotDealItem;
