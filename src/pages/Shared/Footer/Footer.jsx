import facebook from '../../../assets/Icons/facebook.png';
import youtube from '../../../assets/Icons/youtube.png';
import whatsapp from '../../../assets/Icons/whatsapp.png';
import pinterest from '../../../assets/Icons/pinterest.png';
import logo from '../../../assets/Icons/bondonbdlogo.jpg';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-[#15161d] border-t-[3px] border-[#ff5a00]">
      <div className="grid grid-cols-2 md:grid-cols-4 p-[1rem] md:px-[5rem] py-7 text-white md:justify-items-center gap-2.5 lg:gap-0">
        <div>
          <img src={logo} className="w-28 mb-2 rounded-sm" alt="logo" />
          <p className="text-sm text-gray-200 text-justify">
            Bondon BD is a leading e-commerce platform in Bangladesh, dedicated
            to providing a seamless online shopping experience. Offering a
            diverse range of products across multiple categories.
          </p>
        </div>
        <div>
          <h5 className="font-bold mb-3">CATEGORIES</h5>
          <ul className="text-sm space-y-1 text-gray-300">
            <li>Electronics</li>
            <li>Cloths</li>
            <li>Accessories</li>
            <li>Watchs</li>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-3">QUICK LINKS</h5>
          <ul className="text-sm space-y-1 text-gray-300">
            <Link to="/">
              <li>Home</li>
            </Link>
            <Link to="/shop">
              <li>Shop</li>
            </Link>
            <Link to="/aboutUs">
              <li>About Us</li>
            </Link>
            <Link to="/contactUs">
              <li>Contacts Us</li>
            </Link>
            <Link to="/dashboard">
              <li>My Account</li>
            </Link>
          </ul>
        </div>
        <div>
          <h5 className="font-bold mb-3">CONTACT</h5>
          <ul className="text-sm space-y-1 text-gray-300">
            <li>📍 Jamalpur, Mymensingh</li>
            <li>📧 bondonbd61@gmail.com</li>
            <li>📞 09638041547</li>
            <li>
              <a
                href="https://maps.app.goo.gl/Beoh9xu7r6CUQiq19"
                className="text-blue-400"
                target="_blank"
              >
                Google Map
              </a>
            </li>
          </ul>
          <div className="flex w-full space-x-0.5 mt-3">
            <a
              href="https://www.facebook.com/profile.php?id=100081657349541&mibextid=ZbWKwL"
              target="_blank"
            >
              <img src={facebook} alt="Facebook" className="max-w-9" />
            </a>
            <a href="#" target="_blank">
              <img src={youtube} alt="YouTube" className="max-w-9" />
            </a>
            <a href="https://wa.me/qr/NMFE2J4B3T6IE1" target="_blank">
              <img src={whatsapp} alt="YouTube" className="max-w-9" />
            </a>
            <a href="#" target="_blank">
              <img src={pinterest} alt="Pinterest" className="max-w-9" />
            </a>
          </div>
        </div>
      </div>
      <p className="h-16 w-full object-fill flex items-center justify-center text-xs text-center font-semibold text-slate-100 bg-[#1e1f29]">
        © 2024 Bondon BD. All Rights Reserved. Developed By
        <span className="text-[#ff5a00] ml-1 font-bold font-serif">
          BANGOLA
        </span>
      </p>
    </footer>
  );
};

export default Footer;
