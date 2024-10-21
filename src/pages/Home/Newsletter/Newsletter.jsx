import { useState } from 'react';
import { FaFacebook, FaPinterest, FaWhatsapp, FaYoutube } from 'react-icons/fa';
import { toast } from 'react-toastify';
import useAxiosPublic from '../../../Hooks/useAxiosPublic';
import { AiOutlineMail } from 'react-icons/ai';

const Newsletter = () => {
  const [email, setEmail] = useState('');
  const axiosPublic = useAxiosPublic();

  const handleSubmit = async e => {
    e.preventDefault();

    if (!email) {
      toast.error('Please enter a valid email address.');
      return;
    }

    const currentDate = new Date();
    const date = currentDate.toLocaleDateString('en-CA');
    const time = currentDate.toLocaleTimeString('en-US', {
      hour: 'numeric',
      minute: 'numeric',
      second: 'numeric',
      hour12: true,
    });

    try {
      const response = await axiosPublic.post('/subscriber', {
        email,
        date,
        time,
      });
      if (response.status === 200) {
        toast.success('Subscribed successfully!');
        setEmail('');
      }
    } catch (error) {
      toast.error('Subscription failed. Please try again.');
    }
  };

  return (
    <section className="relative m-[1rem] xl-[100rem] bg-white py-8 overflow-hidden">
      {/* Background Mail Icon */}
      <AiOutlineMail className="absolute text-[12rem] rotate-12 opacity-10 top-1/2 md:left-1/4 lg:left-1/3 transform -translate-x-1/2 -translate-y-1/2" />

      {/* Content */}
      <div className="relative container mx-auto text-center z-10">
        <h2 className="text-2xl font-medium mb-4">
          Get Next Deal Offer for the{' '}
          <span className="font-bold">NEWSLETTER!</span>
        </h2>
        <div className="flex justify-center">
          <form
            onSubmit={handleSubmit}
            className="relative flex justify-center items-center w-full h-10 max-w-lg"
          >
            <input
              type="email"
              value={email}
              onChange={e => setEmail(e.target.value)}
              className="w-full h-full py-3 px-6 border border-gray-300 rounded-l-full focus:outline-none"
              placeholder="Enter Your Email"
            />
            <button
              type="submit"
              className="bg-[#ff5a00] text-white h-full py-3 px-6 rounded-r-full hover:bg-orange-600 transition duration-300 flex items-center"
            >
              <span className="mr-2">📧</span> Subscribe
            </button>
          </form>
        </div>
        <div className="flex justify-center mt-8 space-x-4">
          <a
            href="#"
            className="text-gray-500 hover:text-[#ff5a00] border-2 p-1.5 transition-all"
          >
            <FaFacebook />
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-[#ff5a00] border-2 p-1.5 transition-all"
          >
            <FaYoutube />
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-[#ff5a00] border-2 p-1.5 transition-all"
          >
            <FaWhatsapp />
          </a>
          <a
            href="#"
            className="text-gray-500 hover:text-[#ff5a00] border-2 p-1.5 transition-all"
          >
            <FaPinterest />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Newsletter;
