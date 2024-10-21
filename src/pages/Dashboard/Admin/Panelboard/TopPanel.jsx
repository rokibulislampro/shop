import React, { lazy, Suspense, useEffect, useState } from 'react';
import { FaChartLine, FaFirstOrder, FaShoppingCart } from 'react-icons/fa';
import normalFilterIcon from '../../../../assets/Icons/filter.png';
import hoverFilterIcon from '../../../../assets/Icons/hoverFilter.png';
import useAxiosSecure from '../../../../Hooks/useAxiosSecure';
const GraphChart = lazy(() => import('./GraphChart'));
import { AiOutlineWallet } from 'react-icons/ai';
import LoadingSpinner from '../../../Shared/LoadingSpinner/LoadingSpinner';
import { Link } from 'react-router-dom';

const TopPanel = () => {
  const axiosSecure = useAxiosSecure();
  const [isHovered, setIsHovered] = useState(false);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState('Today');
  const [orders, setOrders] = useState([]);
  const [totalSales, setTotalSales] = useState(0);
  const [totalOrders, setTotalOrders] = useState(0);
  const [totalProducts, setTotalProducts] = useState(0);
  const [totalProductQuantity, setTotalProductQuantity] = useState(0);
  const [totalExpenses, setTotalExpenses] = useState(0);
  const [incomePercentage, setIncomePercentage] = useState(0);
  const [expensePercentage, setExpensePercentage] = useState(0);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axiosSecure.get('/order');
        const ordersData = response.data;
        setOrders(ordersData);
        filterOrders(selectedFilter, ordersData); // Pass ordersData here
      } catch (error) {
        console.error('Error fetching orders:', error);
      }
    };

    fetchOrders();
  }, [axiosSecure]);

  const calculateTotals = ordersData => {
    const totalSalesCalc = ordersData.reduce(
      (acc, order) => acc + order.orderDetails.total,
      0
    );
    const totalOrdersCalc = ordersData.length;
    const totalProductsCalc = ordersData.reduce(
      (acc, order) => acc + order.orderDetails.products.length,
      0
    );
    const totalProductQuantityCalc = ordersData.reduce(
      (acc, order) =>
        acc +
        order.orderDetails.products.reduce(
          (innerAcc, product) => innerAcc + product.quantity,
          0
        ),
      0
    );
    const totalExpensesCalc = ordersData.reduce(
      (acc, order) =>
        acc +
        order.orderDetails.products.reduce(
          (innerAcc, product) =>
            innerAcc + product.purchasePrice * product.quantity,
          0
        ),
      0
    );

    setTotalSales(totalSalesCalc);
    setTotalOrders(totalOrdersCalc);
    setTotalProducts(totalProductsCalc);
    setTotalProductQuantity(totalProductQuantityCalc);
    setTotalExpenses(totalExpensesCalc);

    const incomePercentageCalc = totalSalesCalc
      ? ((totalSalesCalc - totalExpensesCalc) / totalSalesCalc) * 100
      : 0;
    const expensePercentageCalc = totalSalesCalc
      ? (totalExpensesCalc / totalSalesCalc) * 100
      : 0;

    setIncomePercentage(incomePercentageCalc.toFixed(2));
    setExpensePercentage(expensePercentageCalc.toFixed(2));
  };

  const toggleFilter = () => {
    setIsFilterOpen(prev => !prev);
  };

  const handleFilterSelect = filter => {
    setSelectedFilter(filter);
    setIsFilterOpen(false);
    filterOrders(filter, orders); // Ensure filtering is applied to the current orders state
  };

  const filterOrders = (filter, ordersData) => {
    const currentDate = new Date();
    let filteredData;

    switch (filter) {
      case 'Today':
        filteredData = ordersData.filter(order => {
          const orderDate = new Date(order.orderDetails.date);
          return (
            orderDate.getFullYear() === currentDate.getFullYear() &&
            orderDate.getMonth() === currentDate.getMonth() &&
            orderDate.getDate() === currentDate.getDate()
          );
        });
        break;
      case 'Weekly':
        const startOfWeek = new Date();
        startOfWeek.setDate(currentDate.getDate() - currentDate.getDay());
        filteredData = ordersData.filter(order => {
          const orderDate = new Date(order.orderDetails.date);
          return orderDate >= startOfWeek && orderDate <= currentDate;
        });
        break;
      case 'Monthly':
        filteredData = ordersData.filter(order => {
          const orderDate = new Date(order.orderDetails.date);
          return (
            orderDate.getFullYear() === currentDate.getFullYear() &&
            orderDate.getMonth() === currentDate.getMonth()
          );
        });
        break;
      case 'Yearly':
        filteredData = ordersData.filter(order => {
          const orderDate = new Date(order.orderDetails.date);
          return orderDate.getFullYear() === currentDate.getFullYear();
        });
        break;
      case 'Lifetime':
        filteredData = ordersData; // No filter for lifetime
        break;
      default:
        filteredData = ordersData;
    }

    calculateTotals(filteredData); // Calculate totals based on filtered data
  };

  const [allOrders, setAllOrders] = useState([]);
  const [lifeTimeSales, setLifeTimeSales] = useState(0);
  const [lifeTimeExpenses, setLifeTimeExpenses] = useState(0);
  const [lifeTimeCanceled, setLifeTimeCanceled] = useState(0);
  const [lifeTimeCanceledPurchase, setLifeTimeCanceledPurchase] = useState(0);

  useEffect(() => {
    // Fetch all orders only once for lifetime data
    const fetchLifeData = async () => {
      try {
        const response = await axiosSecure.get('/order');
        const lifeData = response.data.reverse();
        setAllOrders(lifeData);
        calculateTotal(lifeData);
      } catch (error) {
        console.error('Error fetching lifetime data:', error);
      }
    };

    fetchLifeData();
  }, [axiosSecure]);

  // Calculate lifetime canceled total
  const calculateTotal = ordersData => {
    console.log('Orders Data:', ordersData); // Debugging orders data

    const totalSalesCalc = ordersData.reduce(
      (acc, order) => acc + order.orderDetails.total,
      0
    );

    const totalExpensesCalc = ordersData.reduce(
      (acc, order) =>
        acc +
        order.orderDetails.products.reduce(
          (innerAcc, product) =>
            innerAcc + product.purchasePrice * product.quantity,
          0
        ),
      0
    );

    // Filter for canceled orders
    const canceledOrders = ordersData.filter(
      order => order.orderDetails.status === 'Canceled'
    );
    console.log('Canceled Orders:', canceledOrders);

    const totalCanceledPurchaseCalc = canceledOrders.reduce(
      (acc, order) =>
        acc +
        order.orderDetails.products.reduce(
          (innerAcc, product) =>
            innerAcc + product.purchasePrice * product.quantity,
          0
        ),
      0
    );

    console.log(
      'Total Canceled Purchase Calculation:',
      totalCanceledPurchaseCalc
    );

    const totalCanceledCalc = canceledOrders.reduce(
      (acc, order) => acc + order.orderDetails.total,
      0
    );

    // Set the calculated values
    setLifeTimeSales(totalSalesCalc);
    setLifeTimeExpenses(totalExpensesCalc);
    setLifeTimeCanceled(totalCanceledCalc); // Update lifetime canceled
    setLifeTimeCanceledPurchase(totalCanceledPurchaseCalc); // Update lifetime canceled

    // Debugging Final Calculations
    console.log('Total Sales:', totalSalesCalc);
    console.log('Total Expenses:', totalExpensesCalc);
    console.log('Total Canceled:', totalCanceledCalc);
  };

  function getStatusColor(status) {
    switch (status) {
      case 'Delivered':
        return 'green';
      case 'Pending':
        return 'orange';
      case 'Processing':
        return 'blue';
      case 'Canceled':
        return 'red';
      default:
        return 'blue';
    }
  }

  // function formatCurrency(amount) {
  // if (amount >= 1000) {
  //   return (amount / 1000).toFixed(2) + 'k';
  // }
  // return amount;
  // }

  return (
    <section className="md:flex items-start justify-between gap-5">
      <div className="relative w-full">
        <div className="w-full flex justify-between items-center">
          <h4 className="font-semibold text-sm text-[#ff5a00] my-5">
            {selectedFilter} History
          </h4>
          <button
            id="filter-button"
            onClick={toggleFilter}
            className="bg-white hover:bg-[#1d1e29] p-1.5 px-5 rounded shadow-md transition-all"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <img
              src={isHovered ? hoverFilterIcon : normalFilterIcon}
              alt="Filter Button"
              className="w-6"
            />
          </button>
        </div>

        {/* Filter Popup */}
        {isFilterOpen && (
          <div className="absolute bg-white shadow-md rounded-md p-3 z-20 text-sm right-5">
            <h5 className="font-semibold text-xs mb-2">Select Filter Option</h5>
            <ul>
              {['Today', 'Weekly', 'Monthly', 'Yearly', 'Lifetime'].map(
                option => (
                  <li
                    key={option}
                    onClick={() => handleFilterSelect(option)}
                    className="cursor-pointer hover:bg-gray-200 p-1 rounded"
                  >
                    {option}
                  </li>
                )
              )}
            </ul>
          </div>
        )}

        <div className="flex justify-around items-center w-full h-full gap-3">
          <div className="w-full flex flex-col justify-center items-center bg-white space-y-1 rounded-md p-3 shadow-md">
            <div className="bg-orange-600 text-xl md:text-2xl text-white p-4 rounded-full w-fit ">
              <FaChartLine />
            </div>
            <h6 className="text-xs md:text-sm font-semibold">Total Sales</h6>
            <p className="text-xs">{incomePercentage}%~Gain</p>
            <h3 className="md:text-2xl text-orange-500 font-bold font-serif">
              {/* ৳{formatCurrency(totalSales)} */}৳{totalSales}
            </h3>
          </div>
          <div className="w-full flex flex-col justify-center items-center bg-white space-y-1 rounded-md p-3 shadow-md">
            <div className="bg-green-500 text-xl md:text-2xl text-white p-4 rounded-full w-fit ">
              <FaFirstOrder />
            </div>
            <h6 className="text-xs md:text-sm font-semibold">Orders</h6>
            <p className="text-xs">All~Orders</p>
            <h3 className="md:text-2xl text-orange-500 font-bold font-serif">
              {totalOrders}
            </h3>
          </div>
          <div className="w-full flex flex-col justify-center items-center bg-white space-y-1 rounded-md p-3 shadow-md">
            <div className="bg-indigo-950 text-xl md:text-2xl text-white p-4 rounded-full w-fit ">
              <FaShoppingCart />
            </div>
            <h6 className="text-xs md:text-sm font-semibold">Products</h6>
            <p className="text-xs hidden md:flex">All~Products</p>
            <h3 className="md:text-2xl text-orange-500 font-bold font-serif">
              P: {totalProducts} / Q: {totalProductQuantity}
            </h3>
          </div>
          <div className="w-full flex flex-col justify-center items-center bg-white space-y-1 rounded-md p-3 shadow-md">
            <div className="bg-orange-500 text-xl md:text-2xl text-white p-4 rounded-full w-fit ">
              <AiOutlineWallet /> {/* Wallet */}
            </div>
            <h6 className="text-xs md:text-sm font-semibold">Expenses</h6>
            <p className="text-xs">{expensePercentage}%</p>
            <h3 className="md:text-2xl text-orange-500 font-bold font-serif">
              ৳{totalExpenses}
            </h3>
          </div>
        </div>

        <Suspense fallback={<LoadingSpinner />}>
          <GraphChart orders={orders} />
        </Suspense>

        {/* <ChartComponent /> */}
      </div>
      <div className="space-y-4 mt-3">
        <div className="p-6 w-full min-w-sm mx-auto bg-gradient-to-b from-[#ff5a00] to-orange-400 rounded-lg shadow-lg space-y-1 text-white">
          <div>
            <h2 className="text-2xl font-bold">
              ৳
              {(
                lifeTimeSales -
                lifeTimeCanceled -
                (lifeTimeExpenses - lifeTimeCanceledPurchase)
              ).toFixed(2)}
            </h2>
            <h4 className="text-md">Lifetime Profit</h4>
          </div>
          <div className="flex justify-between items-center py-2 text-sm gap-10">
            <div className="flex items-center">
              <span className="text-orange-500 bg-white p-1 px-1.5 text-xs rounded">
                &#8595;
              </span>
              <span className="ml-2">Expenses</span>
            </div>
            <div>
              ৳{(lifeTimeExpenses - lifeTimeCanceledPurchase).toFixed(2)}
            </div>
          </div>
          <div className="flex justify-between items-center py-2 text-sm gap-10">
            <div className="flex items-center">
              <span className="text-green-500 bg-white p-1 px-1.5 text-xs rounded">
                &#8593;
              </span>
              <span className="ml-2">Incomes</span>
            </div>
            <div>৳{(lifeTimeSales - lifeTimeCanceled).toFixed(2)}</div>
          </div>
          <div className="flex justify-between items-center py-2 text-sm gap-10">
            <div className="flex items-center">
              <span className="text-orange-500 bg-white p-1 px-1.5 text-xs rounded">
                &#8595;
              </span>
              <span className="ml-2">Canceled</span>
            </div>
            <div>৳{lifeTimeCanceledPurchase.toFixed(2)}</div>
          </div>

          <button className="mt-4 w-full bg-white text-orange-500 text-sm font-semibold py-2 px-4 rounded-full shadow-md hover:bg-gray-200 transition duration-300">
            Lifetime Overview
          </button>
        </div>

        <div className="bg-white shadow-lg rounded-lg p-3">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">Recent Orders</h3>
            <Link to="/dashboard/orders">
              <p className="text-sm text-slate-600 font-semibold">See All</p>
            </Link>
          </div>
          <div className="mt-4 overflow-auto h-60">
            {allOrders.map(order => (
              <div
                key={order._id}
                className="flex items-center justify-between gap-5"
              >
                <div className="product-details">
                  {order.orderDetails.products.map(product => (
                    <div
                      key={product.id}
                      className="flex items-center gap-1 md:text-xs py-2"
                    >
                      <img
                        src={product.image}
                        className="w-8"
                        alt={product.name}
                      />
                      <p>{product.name}</p>
                    </div>
                  ))}
                </div>
                <p style={{ color: getStatusColor(order.orderDetails.status) }}>
                  {order.orderDetails.status}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TopPanel;
