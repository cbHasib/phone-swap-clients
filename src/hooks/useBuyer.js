import { useEffect, useState } from "react";

const useBuyer = (email) => {
  const [isBuyer, setIsBuyer] = useState(false);
  const [isBuyerLoading, setIsBuyerLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_API_URL}/users/role/${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            if (data.role === "buyer") {
              setIsBuyer(true);
            } else {
              setIsBuyer(false);
            }
          } else {
            setIsBuyer(false);
          }
          setIsBuyerLoading(false);
        });
    } else {
      setIsBuyerLoading(false);
    }
  }, [email]);

  return [isBuyer, isBuyerLoading];
};

export default useBuyer;
