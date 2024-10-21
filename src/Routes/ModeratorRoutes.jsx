import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import useModerator from '../Hooks/useModerator';
import LoadingSpinner from '../pages/Shared/LoadingSpinner/LoadingSpinner';

const ModeratorRoutes = ({ children }) => {
  const { user, loading } = useAuth();
  const [isModerator, isModeratorLoading] = useModerator();
  const location = useLocation();

  if (loading || isModeratorLoading) {
    return <LoadingSpinner />;
  }

  if (user && isModerator) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default ModeratorRoutes;
