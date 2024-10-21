
// LoadingSpinner.js
import React from 'react';
import './LoadingSpinner.css';  // Make sure to import the CSS file

const LoadingSpinner = () => {
  return (
    <section className="loader-container">
      <div className="loader">
        {Array.from({ length: 12 }).map((_, index) => (
          <span key={index}></span>
        ))}
      </div>
    </section>
  );
};

export default LoadingSpinner;
