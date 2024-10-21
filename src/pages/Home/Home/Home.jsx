import LoadingSpinner from '../../Shared/LoadingSpinner/LoadingSpinner';
import { lazy, Suspense } from 'react';
const Banner = lazy(() => import('../Banner/Banner'));
const Categories = lazy(() => import('../Categories/Categories'));
const NewProduct = lazy(() => import('../NewProduct/NewProduct'));
const TopSelling = lazy(() => import('../TopSelling/TopSelling'));
const HotDeal = lazy(() => import('../HotDeal/HotDeal'));
const Compare = lazy(() => import('../Compare/Compare'));
const Newsletter = lazy(() => import('../Newsletter/Newsletter'));
const NewOffer = lazy(() => import('../NewOffer/NewOffer'));

const Home = () => {
  return (
    <section>
      <Suspense fallback={<LoadingSpinner />}>
        <Banner />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <div className="mx-[0.3rem] md:m-5 xl:m-0 my-5">
          <Categories />
        </div>
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <NewProduct />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <HotDeal />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Compare />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <TopSelling />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <NewOffer />
      </Suspense>
      <Suspense fallback={<LoadingSpinner />}>
        <Newsletter />
      </Suspense>
    </section>
  );
};

export default Home;
