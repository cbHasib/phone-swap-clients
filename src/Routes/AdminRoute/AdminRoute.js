import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Contexts/UserContext";
import useAdmin from "../../hooks/useAdmin";
import LoadingSpinner from "../../Pages/Shared/LoadingSpinner/LoadingSpinner";

const AdminRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isAdmin, isAdminLoading] = useAdmin(user?.email);
  const location = useLocation();

  if (loading || isAdminLoading) {
    return <LoadingSpinner />;
  }

  if (user && isAdmin) {
    return children;
  }

  return (
    <>
      <Navigate to="/login" state={{ from: location }} replace />
      {toast.error("You are not authorized to access this page")}
    </>
  );
};

export default AdminRoute;
