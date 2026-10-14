import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const PublicRoute = () => {
  const {
    user,
    isAuthenticated,
    loading,
  } = useSelector((state) => state.auth);

  // Authentication check abhi complete nahi hua
  if (loading) {
    return null;
  }

  // Valid logged-in user
  if (isAuthenticated && user) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
};

export default PublicRoute;