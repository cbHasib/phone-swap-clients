import React, { useContext } from "react";
import toast from "react-hot-toast";
import { Navigate, useLocation } from "react-router-dom";
import { AuthContext } from "../../Contexts/UserContext";
import useBuyer from "../../hooks/useBuyer";
import LoadingSpinner from "../../Pages/Shared/LoadingSpinner/LoadingSpinner";

const BuyerRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const [isBuyer, isBuyerLoading] = useBuyer(user?.email);
  const location = useLocation();

  if (loading || isBuyerLoading) {
    return <LoadingSpinner />;
  }

  if (user && isBuyer) {
    return children;
  }

  return (
    <>
      <Navigate to="/login" state={{ from: location }} replace />
      {toast.error("You are not authorized to access this page")}
    </>
  );
};

export default BuyerRoute;
