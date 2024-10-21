import { Outlet } from "react-router-dom"
import Footer from "../pages/Shared/Footer/Footer"
import Navbar from "../pages/Shared/Header/Navbar";
import ShopInfo from "../pages/Shared/ShopInfo/ShopInfo";
import LoadingSpinner from "../pages/Shared/LoadingSpinner/LoadingSpinner";
import { useEffect, useState } from "react";

const main = () => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  if (loading) {
    return <LoadingSpinner />;
  }

  return (
    <div>
      <Navbar />
      <div className="min-h-full">
        <Outlet></Outlet>
      </div>
      <ShopInfo></ShopInfo>
      <Footer />
    </div>
  );
}

export default main
