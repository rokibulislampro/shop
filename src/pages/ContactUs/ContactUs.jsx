import React, { useState } from 'react';
import {
  AiOutlineClockCircle,
  AiOutlineEnvironment,
  AiOutlineMail,
  AiOutlinePhone,
} from 'react-icons/ai';
import { toast } from 'react-toastify';
import useAxiosSecure from '../../Hooks/useAxiosSecure';
import './Contact.css';
import { Helmet } from 'react-helmet-async';

const ContactUs = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });
  const axiosSecure = useAxiosSecure(); // Hook to handle secure API requests

  // Handle form field changes
  const handleChange = e => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async e => {
    e.preventDefault();
    try {
      const response = await axiosSecure.post('/contact', formData); // Securely post data
      toast.success('Message sent successfully!'); // Show success notification
      setFormData({ name: '', email: '', phone: '', message: '' }); // Clear form
    } catch (error) {
      toast.error('Failed to send message!'); // Show error notification
    }
  };

  return (
    <section className="container p-[0.5rem] xl:px-[10rem]">
      <Helmet>
        <title>Bondon BD | Contact Us</title>
      </Helmet>
      {/* Contact Us Section */}
      <h1 className="text-2xl font-bold text-gray-900 my-5">CONTACT US</h1>

      {/* Google Map */}
      <div className="h-80 mb-8 md:mb-0">
        <iframe
          title="Google Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d231716.69225891653!2d89.84210158979933!3d24.844261322725117!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x37562a6701243c3f%3A0x858d99825a66aced!2sJamalpur%20Sadar%20Upazila!5e0!3m2!1sen!2sbd!4v1729189412570!5m2!1sen!2sbd"
          className="w-full h-full border-none rounded-lg"
          allowFullScreen=""
          loading="lazy"
        />
      </div>

      {/* Google Map and Contact Details */}
      <div className="w-full md:flex gap-5 my-[2rem] space-y-4">
        {/* Form Section */}
        <div className="w-full border p-3 rounded">
          <h2 className="text-xl font-semibold mb-4">Write to Us</h2>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Name <span className="text-[#ff5a00]">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Email <span className="text-[#ff5a00]">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                required
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                Phone Number <span className="text-[#ff5a00]">*</span>
              </label>
              <input
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
              />
            </div>
            <div>
              <label className="block mb-2 text-sm font-medium">
                What's on your mind?
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-md"
                rows="4"
                required
              ></textarea>
            </div>
            <button
              type="submit"
              className="px-6 py-2 bg-[#ff5a00] text-white font-semibold rounded-full hover:bg-orange-600"
            >
              Send Message
            </button>
          </form>
        </div>

        {/* Contact Information */}
        <div className="w-full md:w-1/2 space-y-4 text-gray-700 border rounded p-3">
          <h2 className="text-xl font-semibold">Contact Us</h2>
          <p className="flex items-center">
            <span className="material-icons mr-2 text-[#ff5a00]">
              <AiOutlineEnvironment />
            </span>
            Address: 2000 - Jamalpur, Mymensingh, Dhaka, Bangladesh
          </p>
          <p className="flex items-center">
            <span className="material-icons mr-2 text-[#ff5a00]">
              <AiOutlinePhone />
            </span>
            Hotline: (+880) 9638041547
          </p>
          <p className="flex items-center">
            <span className="material-icons mr-2 text-[#ff5a00]">
              <AiOutlineMail />
            </span>
            Email: bondonbd61@gmail.com
          </p>
          <p className="flex items-center">
            <span className="material-icons mr-2 text-[#ff5a00]">
              <AiOutlineClockCircle />
            </span>
            Access Time: Always Open
          </p>
        </div>
      </div>
    </section>
  );
};

export default ContactUs;
