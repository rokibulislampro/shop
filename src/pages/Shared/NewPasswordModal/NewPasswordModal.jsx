import React, { useState } from 'react';
import { toast } from 'react-toastify';
import Modal from 'react-modal';

const NewPasswordModal = ({ isOpen, onClose, setNewPassword }) => {
  const [newPassword, setNewPasswordInput] = useState('');

  const handleSubmit = () => {
    if (!newPassword) {
      toast.error('Please enter a new password!');
      return;
    }

    setNewPassword(newPassword)
      .then(() => {
        toast.success('Password has been reset successfully!');
        onClose(); // Close the modal after setting new password
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
      <h2 className="text-center text-lg font-bold">Set New Password</h2>
      <input
        type="password"
        placeholder="Enter new password"
        value={newPassword}
        onChange={e => setNewPasswordInput(e.target.value)}
        className="mt-4 w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-orange-400"
      />
      <button
        onClick={handleSubmit}
        className="mt-4 w-full px-4 py-2 text-white bg-orange-500 rounded-md hover:bg-orange-600"
      >
        Set Password
      </button>
      <button
        onClick={onClose}
        className="mt-2 w-full px-4 py-2 text-gray-700 border border-gray-300 rounded-md hover:bg-gray-100"
      >
        Cancel
      </button>
    </Modal>
  );
};

export default NewPasswordModal;
