import { lazy, Suspense } from 'react';
import { Helmet } from 'react-helmet-async';
import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
const ShopCard = lazy(() => import('../ShopCard/ShopCard'));
const TopBanner = lazy(() => import('../../Shared/TopBanner/TopBanner'));

const Shop = () => {

  return (
    <section>
      <Helmet>
        <title>Bondon BD | Shop</title>
      </Helmet>
      <Suspense fallback={<LoadingSpinner />}>
        <ShopCard />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <TopBanner />
      </Suspense>
    </section>
  );
};

export default Shop;
