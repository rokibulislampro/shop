import { lazy, Suspense } from 'react';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';

const BannerCard = lazy(() => import('./BannerCard'));
const Deals = lazy(() => import('./Deals'));


const Banners = () => {
  return (
    <section>
      <Suspense fallback={<LoadingSpinner />}>
        <BannerCard />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Deals />
      </Suspense>
    </section>
  );
}

export default Banners
