import { createBrowserRouter } from 'react-router-dom';
import { Suspense, lazy } from 'react';
import Main from '../Layout/Main';
import LoadingSpinner from '../pages/Shared/LoadingSpinner/LoadingSpinner';
import PrivateRoutes from './PrivateRoutes';

const Home = lazy(() => import('../pages/Home/Home/Home'));
const Login = lazy(() => import('../pages/Login/Login'));
const Register = lazy(() => import('../pages/Register/Register'));
const AboutUs = lazy(() => import('../pages/AboutUs/AboutUs'));
const ContactUs = lazy(() => import('../pages/ContactUs/ContactUs'));
const Secret = lazy(() => import('../pages/Shared/Secret/Secret'));
const Error = lazy(() => import('../pages/Shared/Error/Error'));
const Cart = lazy(() => import('../pages/Order/Cart/Cart'));
const Checkout = lazy(() => import('../pages/Order/Checkout/Checkout'));
const Ordered = lazy(() => import('../pages/Order/Ordered/Ordered'));
const Wishlist = lazy(() => import('../pages/Order/Wishlist/Wishlist'));
const Dashboard = lazy(() => import('../Layout/Dashboard'));
const Shop = lazy(() => import('../pages/Shop/Shop/Shop'));
const Product = lazy(() => import('../pages/Product/Product/Product'));
const Panelboard = lazy(() =>
  import('../pages/Dashboard/Admin/Panelboard/Panelboard')
);
const Products = lazy(() => import('../pages/Dashboard/Admin/Products/Products'));
const Orders = lazy(() => import('../pages/Dashboard/Admin/Orders/Orders'));
const OrderDetails = lazy(() => import('../pages/Dashboard/Admin/Orders/OrderDetails'));
const Customers = lazy(() => import('../pages/Dashboard/Admin/Customers/Customers'));
const Users = lazy(() => import('../pages/Dashboard/Admin/Users/Users'));
const Sales = lazy(() => import('../pages/Dashboard/Admin/Sales/Sales'));
const MyOrder = lazy(() => import('../pages/Dashboard/User/MyOrder/MyOrder'));
const Banners = lazy(() => import('../pages/Dashboard/Admin/Banners/Banners'));
const NotAvailable = lazy(() => import('../pages/Dashboard/NotAvailable/NotAvailable'));

import ReactGA from 'react-ga4';

ReactGA.initialize('your GA measurement id');

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Main />,
    children: [
      {
        path: '/',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Home />
          </Suspense>
        ),
      },
      {
        path: '/shop',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: '/shop/:category',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Shop />
          </Suspense>
        ),
      },
      {
        path: '/login',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Login />
          </Suspense>
        ),
      },
      {
        path: '/register',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Register />
          </Suspense>
        ),
      },
      {
        path: '/product/:id',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Product />
          </Suspense>
        ),
      },
      {
        path: '/cart',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: '/checkout',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Checkout />
          </Suspense>
        ),
      },
      {
        path: '/ordered',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Ordered />
          </Suspense>
        ),
      },
      {
        path: '/wishlist',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Wishlist />
          </Suspense>
        ),
      },
      {
        path: '/aboutUs',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <AboutUs />
          </Suspense>
        ),
      },
      {
        path: '/contactUs',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <ContactUs />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Error />
          </Suspense>
        ),
      },
      {
        path: '/secret',
        element: (
          <PrivateRoutes>
            <Suspense fallback={<LoadingSpinner />}>
              <Secret />
            </Suspense>
          </PrivateRoutes>
        ),
      },
    ],
  },
  {
    path: '/dashboard',
    element: (
      <PrivateRoutes>
        <Suspense fallback={<LoadingSpinner />}>
          <Dashboard />
        </Suspense>
      </PrivateRoutes>
    ),
    children: [
      {
        path: 'panelboard',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Panelboard />
          </Suspense>
        ),
      },
      {
        path: 'users',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Users />
          </Suspense>
        ),
      },
      {
        path: 'sales',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Sales />
          </Suspense>
        ),
      },
      {
        path: 'banners',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Banners />
          </Suspense>
        ),
      },
      {
        path: 'products',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Products />
          </Suspense>
        ),
      },
      {
        path: 'orders',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Orders />
          </Suspense>
        ),
      },
      {
        path: 'customers',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Customers />
          </Suspense>
        ),
      },
      {
        path: 'orderDetails',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <OrderDetails />
          </Suspense>
        ),
      },
      {
        path: 'myOrder',
        element: (
          <PrivateRoutes>
            <Suspense fallback={<LoadingSpinner />}>
              <MyOrder />
            </Suspense>
          </PrivateRoutes>
        ),
      },
      {
        path: 'cart',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Cart />
          </Suspense>
        ),
      },
      {
        path: 'wishlist',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Wishlist />
          </Suspense>
        ),
      },
      {
        path: 'notAvailable',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <NotAvailable />
          </Suspense>
        ),
      },
      {
        path: '*',
        element: (
          <Suspense fallback={<LoadingSpinner />}>
            <Error />
          </Suspense>
        ),
      },
    ],
  },
]);
