// src/hooks/useUsers.js
import { useQuery } from '@tanstack/react-query';
import useAxiosSecure from './useAxiosSecure';

const useUsers = () => {
  const axiosSecure = useAxiosSecure();

  return useQuery({
    queryKey: ['user'],
    queryFn: async () => {
      const { data } = await axiosSecure.get('/user');
      return data;
    },
  });
};

export default useUsers;
