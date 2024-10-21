import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal'; // Make sure to install react-modal

const PasswordResetModal = ({ isOpen, onClose, resetPassword }) => {
  const [email, setEmail] = useState('');

  const handleSubmit = () => {
    if (!email) {
      toast.error('Please enter your email address!');
      return;
    }

    resetPassword(email)
      .then(() => {
        toast.success('Password reset email sent! Please check your inbox.');
        onClose(); // Close the modal after sending email
      })
      .catch(error => {
        toast.error(`Error: ${error.message}`);
      });
  };

  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      style={{
        overlay: { backgroundColor: 'rgba(0, 0, 0, 0.5)' },
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          marginRight: '-50%',
          transform: 'translate(-50%, -50%)',
          borderRadius: '8px',
          padding: '20px',
          maxWidth: '400px',
          width: '90%',
        },
      }}
    >
      <h2 className="text-center text-lg font-bold">Reset Password</h2>
      <input
        type="email"
        placeholder="Enter your email"
        value={email}
        onChange={e => setEmail(e.target.value)}
        className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#ff5a00]"
      />
      <div className="flex justify-center items-center gap-2 mt-4">
        <button
          onClick={onClose}
          className="w-full px-4 py-2 text-gray-700 hover:text-white border border-gray-300 rounded-full hover:bg-[#1e1f29] transition-all"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          className="w-full px-4 py-2 text-white bg-[#ff5a00] rounded-full hover:bg-orange-600 transition-all"
        >
          Send Reset Link
        </button>
      </div>
    </Modal>
  );
};

export default PasswordResetModal;
