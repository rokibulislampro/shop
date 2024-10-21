import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AuthContext } from '../../providers/AuthProvider';
import useAxiosPublic from '../../Hooks/useAxiosPublic';
import { ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { storage } from '../../firebase/firebase.config';
// import { storage } from '../../firebase/firebase.config'; // Firebase configuration

const Register = () => {
  const axiosPublic = useAxiosPublic();
  const { createUser, updateUserProfile } = useContext(AuthContext);
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
    watch,
  } = useForm();
  const password = watch('password');

  const generateUserId = () => {
    return Math.floor(10000000 + Math.random() * 90000000);
  };

  const uploadImageToFirebase = file => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `users/${file.name}`);
      const uploadTask = uploadBytesResumable(storageRef, file);

      uploadTask.on(
        'state_changed',
        snapshot => {
          // Upload progress
        },
        error => {
          reject(error);
        },
        () => {
          // When the upload is complete, get the download URL
          getDownloadURL(uploadTask.snapshot.ref).then(downloadURL => {
            resolve(downloadURL);
          });
        }
      );
    });
  };

  const formatDateTime = date => {
    // Format the date as YYYY-MM-DD hh:mm:ss AM/PM
    const options = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: true,
    };

    return date.toLocaleString('en-US', options).replace(',', '');
  };

  const onSubmit = async data => {
    console.log('Form Data:', data); // Check form data

    const userId = generateUserId();

    // Get current date and time in the desired format
    const currentDate = new Date();
    const joined = formatDateTime(currentDate); // Format date and time together

    try {
      // Upload the photo to Firebase
      const photoURL = await uploadImageToFirebase(data.photo[0]);
      console.log('Photo URL:', photoURL); // Check photo upload

      // Create user in Firebase Authentication
      const result = await createUser(data.email, data.password);
      console.log('Firebase User:', result.user); // Check Firebase user creation

      // Update Firebase user profile with name and photo
      await updateUserProfile(data.name, photoURL);

      // Prepare user info for MongoDB
      const userInfo = {
        userId: userId,
        name: data.name,
        email: data.email,
        photo: photoURL,
        phone: data.phone,
        city: data.city,
        country: data.country,
        joined: joined, // Add joined field with formatted date and time
      };
      console.log('User Info:', userInfo); // Check user data before sending to MongoDB

      // Post user info to MongoDB
      const res = await axiosPublic.post('/user', userInfo);
      if (res.data.insertedId) {
        reset();
        toast.success('User created successfully.');
        navigate('/dashboard');
      }
    } catch (error) {
      console.error('Error during registration:', error);

      // Show toast alert for duplicate email error
      if (error.code === 'auth/email-already-in-use') {
        toast.error('This email is already in use. Please try another one.');
      } else {
        toast.error('Registration failed. Please try again.');
      }
    }
  };

  return (
    <section>
      <Helmet>
        <title>Bondon BD | Register</title>
      </Helmet>

      <div className="flex justify-center items-center bg-gray-100">
        <div className="w-full m-5 max-w-xl p-8 space-y-8 bg-white shadow-lg rounded-md">
          <h1 className="text-2xl font-bold text-center">Create an Account</h1>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-3">
            <div className="sm:flex gap-4">
              <div className="form-control w-full space-y-2">
                <label className="block text-gray-700">
                  Name <span className="text-[#ff5a00]">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Full Name"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#ff5a00]"
                  {...register('name', { required: true })}
                />
                {errors.name && (
                  <span className="text-orange-500">Name is required</span>
                )}
              </div>

              <div className="form-control mt-3 sm:mt-0 w-full space-y-2">
                <label className="block text-gray-700">
                  Photo <span className="text-[#ff5a00]">*</span>
                </label>
                <input
                  type="file"
                  name="photo"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#ff5a00]"
                  {...register('photo', { required: true })}
                />
                {errors.photo && (
                  <span className="text-orange-500">Photo is required</span>
                )}
              </div>
            </div>

            <div className="sm:flex gap-4">
              <div className="form-control w-full space-y-2">
                <label className="block text-gray-700">
                  City / District <span className="text-[#ff5a00]">*</span>
                </label>
                <input
                  type="text"
                  name="city"
                  placeholder="Your City"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#ff5a00]"
                  {...register('city', { required: true })}
                />
                {errors.city && (
                  <span className="text-orange-500">City is required</span>
                )}
              </div>

              <div className="form-control w-full mt-3 sm:mt-0 space-y-2">
                <label className="block text-gray-700">
                  Country <span className="text-[#ff5a00]">*</span>
                </label>
                <input
                  type="text"
                  name="country"
                  placeholder="Your Country"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#ff5a00]"
                  {...register('country', { required: true })}
                />
                {errors.country && (
                  <span className="text-orange-500">Country is required</span>
                )}
              </div>
            </div>

            <div className="sm:flex gap-4">
              <div className="form-control w-full space-y-2">
                <label className="block text-gray-700">
                  Email <span className="text-[#ff5a00]">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#ff5a00]"
                  {...register('email', { required: true })}
                />
                {errors.email && (
                  <span className="text-orange-500">Email is required</span>
                )}
              </div>

              <div className="form-control w-full mt-3 sm:mt-0 space-y-2">
                <label className="block text-gray-700">
                  Number <span className="text-[#ff5a00]">*</span>
                </label>
                <input
                  type="text"
                  name="phone"
                  placeholder="Your Phone Number"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#ff5a00]"
                  {...register('phone', { required: true })}
                />
                {errors.phone && (
                  <span className="text-orange-500">
                    Phone Number is required
                  </span>
                )}
              </div>
            </div>

            <div className="sm:flex gap-4">
              <div className="form-control w-full space-y-2">
                <label className="block text-gray-700">
                  Password <span className="text-[#ff5a00]">*</span>
                </label>
                <input
                  type="password"
                  name="password"
                  placeholder="Your Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#ff5a00]"
                  {...register('password', {
                    required: true,
                    minLength: 6,
                    maxLength: 20,
                    pattern: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])(?=.*[a-z])/,
                  })}
                />
                {errors.password?.type === 'required' && (
                  <p className="text-orange-500">Password is required</p>
                )}
                {errors.password?.type === 'minLength' && (
                  <p className="text-orange-500">
                    Password must be at least 6 characters
                  </p>
                )}
                {errors.password?.type === 'maxLength' && (
                  <p className="text-orange-500">
                    Password must be less than 20 characters
                  </p>
                )}
                {errors.password?.type === 'pattern' && (
                  <p className="text-orange-500">
                    Password must have one uppercase, one lowercase, one number,
                    and one special character
                  </p>
                )}
              </div>

              <div className="form-control w-full mt-3 sm:mt-0 space-y-2">
                <label className="block text-gray-700">
                  Confirm Password <span className="text-[#ff5a00]">*</span>
                </label>
                <input
                  type="password"
                  name="confirm_password"
                  placeholder="Confirm Password"
                  className="w-full px-4 py-2 border border-gray-300 rounded-full focus:outline-none focus:border-[#ff5a00]"
                  {...register('confirm_password', {
                    required: true,
                    validate: value =>
                      value === password || 'Passwords do not match',
                  })}
                />
                {errors.confirm_password && (
                  <p className="text-orange-500">
                    {errors.confirm_password.message}
                  </p>
                )}
              </div>
            </div>

            <div className="form-control">
              <button
                type="submit"
                className="w-full px-4 py-2 text-white bg-[#ff5a00] rounded-full hover:bg-orange-600"
              >
                Register
              </button>
            </div>
          </form>

          <div className="text-center">
            <Link
              to="/login"
              className="text-[#ff5a00] dashboard list-none w-full flex justify-center"
            >
              <li> Already have an account? Login here.</li>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
