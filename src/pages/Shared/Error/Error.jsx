import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Error = () => {
  return (
    <section>
      <Helmet>
        <title>Bondon BD | Error</title>
      </Helmet>
      <div className="flex justify-center items-center p-[1rem]">
        <div className="flex flex-col justify-center items-center text-center py-10 space-y-4">
          <h1 className="text-7xl font-bold text-[#ff5a00]">Oops!</h1>
          <h2 className="text-xl font-semibold text-navy">
            404 - PAGE NOT FOUND
          </h2>
          <p className="font-semibold text-sm">
            Sorry! The page you are looking for cannot be found. It may have
            been removed, had its name changed, or is temporarily unavailable.
          </p>
          <Link to="/">
            <button className="w-fit flex items-center gap-2 text-[#ff5a00] hover:text-white font-semibold px-10 py-2 border border-[#ff5a00] hover:bg-[#ff5a00] transition-all rounded-full text-sm">
              Home page
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Error;
