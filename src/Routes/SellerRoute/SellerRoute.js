import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Contexts/UserContext";
import useSeller from "../../hooks/useSeller";
import LoadingSpinner from "../../Pages/Shared/LoadingSpinner/LoadingSpinner";

const SellerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isSeller, isSellerLoading] = useSeller(user?.email);
  const location = useLocation();

  if (loading || isSellerLoading) {
    return <LoadingSpinner />;
  }

  if (user && isSeller) {
    return children;
  }

  return (
    <>
      <Navigate to="/login" state={{ from: location }} replace />
      {toast.error("You are not authorized to access this page")}
    </>
  );
};

export default SellerRoute;
