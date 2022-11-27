import { useEffect, useState } from "react";

const useSeller = (email) => {
  const [isSeller, setIsSeller] = useState(false);
  const [isSellerLoading, setIsSellerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_API_URL}/users/role/${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            if (data.role === "seller") {
              setIsSeller(true);
            } else {
              setIsSeller(false);
            }
          } else {
            setIsSeller(false);
          }
          setIsSellerLoading(false);
        });
    } else {
      setIsSellerLoading(false);
    }
  }, [email]);

  return [isSeller, isSellerLoading];
};

export default useSeller;
