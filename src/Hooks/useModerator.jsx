import { useQuery } from '@tanstack/react-query';
import useAuth from './useAuth';
import useAxiosSecure from './useAxiosSecure';

const useModerator = () => {
  const { user, loading } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: isModerator, isPending: isModeratorLoading } = useQuery({
    queryKey: [user?.email, 'isModerator'],
    enabled: !loading,
    queryFn: async () => {
      if (!user?.email) return false;
      const res = await axiosSecure.get(`/user/moderator/${user.email}`);
      return res.data?.moderator;
    },
  });

  return [isModerator, isModeratorLoading];
};

export default useModerator;
