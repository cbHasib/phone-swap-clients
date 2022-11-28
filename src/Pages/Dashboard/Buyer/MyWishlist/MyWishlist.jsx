import React from "react";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import useTitle from "../../../../hooks/useTitle";

const MyWishlist = () => {
  useScrollToTop();
  useTitle("My Wishlist");
  return (
    <div>
      <h2>My Wishlist</h2>
    </div>
  );
};

export default MyWishlist;
