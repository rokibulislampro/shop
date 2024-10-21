import React, { useContext } from 'react';
import { WishlistContext } from '../../../Features/ContextProvider';
import { Helmet } from 'react-helmet-async';
import WishlistCard from '../../Shared/WishlistCard/WishlistCard';
import emptyWishlist from '../../../assets/Icons/wishList.jpg';
import { Link } from 'react-router-dom';

const Wishlist = () => {
  const { wishlist } = useContext(WishlistContext);

  const hasProducts = wishlist.length > 0;

  return (
    <section>
      <Helmet>
        <title>Bondon BD | WishList</title>
      </Helmet>
      <div className="m-[1rem]">
        {!hasProducts && (
          <div className="flex flex-col justify-center items-center my-10">
            <img src={emptyWishlist} className="w-52" alt="" />
            <h2 className="text-3xl font-semibold my-4">
              Your Wishlist is <span className="text-[#ff5a00]">Empty!</span>
            </h2>
            <p className="text-center font-semibold mb-3">
              Create your first wishlist request.
            </p>
            <Link to="/shop">
              <button className="w-fit text-white font-semibold px-8 py-2 bg-[#ff5a00] hover:bg-[#15161d] rounded-full transition-all text-sm">
                Make New Wish
              </button>
            </Link>
          </div>
        )}
        {hasProducts && (
          <div className="xl:mx-[10rem]">
            <h2 className="text-2xl my-10 text-[#ff5a00] uppercase font-semibold">
              Your Wishlist
            </h2>
            <div className="">
              {wishlist.map(product => (
                <WishlistCard key={product.id} product={product} />
              ))}
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default Wishlist;
