import React from 'react';
import { Helmet } from 'react-helmet-async';

const AboutUs = () => {
  return (
    <section className="p-[1rem] xl:px-[10rem]">
      <Helmet>
        <title>Bondon BD | About Us</title>
      </Helmet>
      {/* Hero Section */}
      <div className="container mx-auto ">
        <h1 className="text-4xl font-bold text-gray-800 mt-5">
          Welcome to Bondon BD
        </h1>
        <p className="text-lg text-gray-600 my-3">
          Your one-stop destination for the best online shopping experience.
        </p>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto my-5">
        <h2 className="text-3xl font-semibold text-gray-800">Our Story</h2>
        <div className="">
          <p className="text-gray-700 text-lg my-3 text-justify">
            Bondon BD was born with a vision to provide top-notch products and
            services to customers worldwide. We are committed to bringing the
            latest trends and the most reliable products right to your doorstep.
          </p>
          <p className="text-gray-700 text-lg text-justify">
            What started as a small idea has now blossomed into a leading
            e-commerce platform, serving millions of satisfied customers every
            day.
          </p>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-white">
        <div className="container mx-auto ">
          <h2 className="text-3xl font-semibold text-gray-800 mb-3">
            Our Mission
          </h2>
          <p className="text-gray-700 text-lg mb-8 text-justify">
            Our mission is simple: to offer the best quality products at the
            best prices with unmatched customer service. We work tirelessly to
            make online shopping easy, secure, and enjoyable for everyone.
          </p>
        </div>
      </div>

      {/* Purpose & Performance Section */}
      <div className="container mx-auto my-5">
        <h2 className="text-3xl font-semibold text-gray-800 mb-3 ">
          Our Purpose & Product Performance
        </h2>
        <div className="">
          <p className="text-gray-700 text-lg text-justify">
            At Bondon BD, we are driven by a singular purpose: to empower our
            customers with a seamless shopping experience. Our commitment to
            quality and innovation extends beyond just providing products; we
            focus on building trust and loyalty with every purchase.
          </p>
          <p className="text-gray-700 text-lg my-3 text-justify">
            Over the years, Bondon BD has established a benchmark for product
            performance. Every item in our store undergoes strict quality
            control checks to ensure it meets the highest standards. From
            electronics to home essentials, our customers rely on us for
            durable, high-performance products.
          </p>
          <p className="text-gray-700 text-lg text-justify">
            Whether you're shopping for fashion, electronics, or home decor, our
            products not only meet your needs but exceed your expectations,
            providing value and satisfaction.
          </p>
        </div>
      </div>

      {/* Values Section */}
      <div className="container mx-auto my-5">
        <h2 className="text-3xl font-semibold text-gray-800 mb-3 text-center">
          Our Core Values
        </h2>
        <div className="flex flex-wrap justify-center gap-6">
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Quality
            </h3>
            <p className="text-gray-700 text-justify">
              We are dedicated to delivering the highest quality products to our
              customers.
            </p>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Innovation
            </h3>
            <p className="text-gray-700 text-justify">
              We believe in constant innovation to meet the evolving needs of
              our customers.
            </p>
          </div>
          <div className="w-full md:w-1/3 lg:w-1/4 bg-white p-6 shadow-md rounded-lg">
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              Customer First
            </h3>
            <p className="text-gray-700 text-justify">
              Customer satisfaction is at the heart of everything we do.
            </p>
          </div>
        </div>
      </div>

      {/* Team Section */}
      <div className="bg-gray-100 my-5 p-5 rounded">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Meet Our Team
          </h2>
          <p className="text-gray-700 text-lg mb-8 text-justify">
            We are a passionate team of professionals dedicated to making Bondon
            BD your favorite online shopping platform.
          </p>
        </div>
      </div>

      {/* Footer Section */}
      <div className="container mx-auto  py-8">
        <h3 className="text-xl font-semibold text-gray-800">
          Join us on our journey!
        </h3>
        <p className="text-gray-600 text-justify">
          Whether you're a new or returning customer, we are here to serve you
          with the best shopping experience.
        </p>
      </div>
    </section>
  );
};

export default AboutUs;
