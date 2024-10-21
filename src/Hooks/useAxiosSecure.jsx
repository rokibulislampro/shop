import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import useAuth from './useAuth';

const axiosSecure = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
});

const useAxiosSecure = () => {
  const navigate = useNavigate();
  const { logOut } = useAuth();

  axiosSecure.interceptors.request.use(
    config => {
      const token = localStorage.getItem('access-token');
      const userRole = localStorage.getItem('user-role'); 
      
      if (token) {
        config.headers.authorization = `Bearer ${token}`;
      }

      if (userRole === 'blocked') {
        logOut();
        navigate('/Login');
        return Promise.reject(new Error('Your account is blocked.'));
      }

      return config;
    },
    error => Promise.reject(error)
  );

  axiosSecure.interceptors.response.use(
    response => response,
    async error => {
      const status = error.response?.status;

      if (status === 401 || status === 403) {
        await logOut();
        navigate('/Login');
      }
      return Promise.reject(error);
    }
  );

  return axiosSecure;
};

export default useAxiosSecure;
