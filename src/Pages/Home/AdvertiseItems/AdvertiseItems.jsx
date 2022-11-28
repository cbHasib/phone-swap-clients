import { useQuery } from "@tanstack/react-query";
import React, { useContext, useState } from "react";
import toast from "react-hot-toast";
import { AuthContext } from "../../../Contexts/UserContext";
import useDbUser from "../../../hooks/useDbUser";
import PhonesCardVer from "../../Phones/PhonesCardVer/PhonesCardVer";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";

const AdvertiseItems = () => {
  const { user, loading } = useContext(AuthContext);
  const [dbUser, isDbUserLoading] = useDbUser(user?.email);
  const [wishlistLoading, setWishlistLoading] = useState(false);
  const [bookLoading, setBookLoading] = useState(false);
  const [productId, setProductId] = useState("");

  const {
    data: promotedProducts = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["promotedProducts"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/products/promoted`
      );
      const data = await res.json();

      if (data.success) {
        return data.data;
      } else {
        return [];
      }
    },
  });

  const handleBooking = (id) => {
    if (!user || !dbUser) {
      toast.error("Please login to book");
      return;
    }

    setProductId(id);
    setBookLoading(true);
    setTimeout(() => {
      setBookLoading(false);
      toast.success(`Booking Successful for product ${id}`);
      refetch();
    }, 2000);
  };

  const handleAddToWishlist = (id) => {
    if (!user || !dbUser) {
      toast.error("Please login to add to wishlist");
      return;
    }
    setProductId(id);
    setWishlistLoading(true);
    setTimeout(() => {
      setWishlistLoading(false);
      toast.success(`Added to Wishlist for product ${id}`);
      refetch();
    }, 2000);
  };
  const handleReport = (id) => {
    if (!user || !dbUser) {
      toast.error("Please login to report");
      return;
    }
    setProductId(id);
    setWishlistLoading(true);
    setTimeout(() => {
      setWishlistLoading(false);
      toast.success(`Added to Wishlist for product ${id}`);
      refetch();
    }, 2000);
  };

  if (isLoading || isDbUserLoading || loading) {
    return <LoadingSpinner />;
  }

  return (
    <div className="dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 px-5 py-20">
      <div className="max-w-7xl mx-auto">
        <h2 className="text-3xl font-bold text-blue-700 dark:text-white/90 text-center">
          Sponsored Ads
        </h2>

        <div className="py-10 flex flex-wrap gap-6 justify-center items-center">
          {promotedProducts?.map((product) => (
            <PhonesCardVer
              key={product?._id}
              product={product}
              isLoading={isLoading}
              bookLoading={bookLoading}
              wishlistLoading={wishlistLoading}
              handleAddToWishlist={handleAddToWishlist}
              handleBooking={handleBooking}
              productId={productId}
              handleReport={handleReport}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdvertiseItems;
