import React, { useContext, useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { toast } from 'react-toastify';
import { AuthContext } from '../../providers/AuthProvider';
import PasswordResetModal from '../Shared/PasswordResetModal/PasswordResetModal';
import NewPasswordModal from '../Shared/NewPasswordModal/NewPasswordModal';
import { HiEye, HiEyeOff } from 'react-icons/hi'; // Import eye icons

const Login = () => {
  const { signIn, resetPassword, setNewPassword } = useContext(AuthContext);
  const [isResetModalOpen, setResetModalOpen] = useState(false);
  const [isNewPasswordModalOpen, setNewPasswordModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false); // State for password visibility
  const navigate = useNavigate();
  const location = useLocation();
  const from = location.state?.from?.pathname || '/dashboard';

  const handleLogin = event => {
    event.preventDefault();
    const form = event.target;
    const email = form.email.value;
    const password = form.password.value;

    if (!email || !password) {
      toast.error('Please fill in both fields!');
      return;
    }

    signIn(email, password)
      .then(() => {
        toast.success('User login successful!');
        navigate(from, { replace: true });
      })
      .catch(error => {
        toast.error(`Login failed: ${error.message}`);
      });
  };

  return (
    <section>
      <Helmet>
        <title>Bondon BD | Login</title>
      </Helmet>

      <div className="flex justify-center items-center bg-gray-100">
        <div className="w-full m-5 max-w-xl p-8 space-y-8 bg-white shadow-lg rounded-md">
          <h1 className="text-2xl font-bold text-center">Login / Sign Up</h1>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="form-control">
              <label className="block text-gray-700">
                Email <span className="text-[#ff5a00]">*</span>
              </label>
              <input
                type="email"
                name="email"
                placeholder="Your Email"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#ff5a00]"
                required
              />
            </div>

            <div className="form-control relative">
              <label className="block text-gray-700">
                Password <span className="text-[#ff5a00]">*</span>
              </label>
              <input
                type={showPassword ? 'text' : 'password'} // Toggle input type
                name="password"
                placeholder="Your Password"
                className="w-full px-4 py-2 mt-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#ff5a00]"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)} // Toggle visibility
                className="absolute right-3 top-10 text-[#1e1f29] focus:outline-none"
              >
                {showPassword ? <HiEyeOff size={24} /> : <HiEye size={24} />}
              </button>
            </div>

            <div className="flex items-center justify-between">
              <div className="form-control">
                <label className="inline-flex items-center">
                  <input
                    type="checkbox"
                    className="form-checkbox text-[#ff5a00]"
                  />
                  <span className="ml-2 text-gray-700">Remember me</span>
                </label>
              </div>
              <Link
                to="#"
                className="text-[#ff5a00] dashboard list-none"
                onClick={() => setResetModalOpen(true)}
              >
                <li>Forget password?</li>
              </Link>
            </div>

            <div className="form-control">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-[#ff5a00] rounded-full hover:bg-orange-600"
              >
                Log in
              </button>
            </div>
          </form>

          <div className="mt-4 text-center">
            <Link
              to="/register"
              className="text-[#ff5a00] dashboard list-none w-full flex justify-center"
            >
              <li>Create an account? Register here.</li>
            </Link>
          </div>
        </div>
      </div>

      <PasswordResetModal
        isOpen={isResetModalOpen}
        onClose={() => setResetModalOpen(false)}
        resetPassword={resetPassword}
      />
      <NewPasswordModal
        isOpen={isNewPasswordModalOpen}
        onClose={() => setNewPasswordModalOpen(false)}
        setNewPassword={setNewPassword}
      />
    </section>
  );
};

export default Login;
