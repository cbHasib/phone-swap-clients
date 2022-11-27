import { useEffect, useState } from "react";

const useDbUser = (email) => {
  const [dbUser, setDbUser] = useState(null);
  const [isDbUserLoading, setIsDbUserLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_API_URL}/users/${email}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setDbUser(data.data);
          } else {
            setDbUser(null);
          }
          setIsDbUserLoading(false);
        });
    } else {
      setIsDbUserLoading(false);
    }
  }, [email]);

  return [dbUser, isDbUserLoading];
};

export default useDbUser;
