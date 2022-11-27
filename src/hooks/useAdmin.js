import { useEffect, useState } from "react";

const useAdmin = (email) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [isAdminLoading, setIsAdminLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_API_URL}/users/role/${email}`)
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            if (data.role === "admin") {
              setIsAdmin(true);
            } else {
              setIsAdmin(false);
            }
          } else {
            setIsAdmin(false);
          }
          setIsAdminLoading(false);
        });
    } else {
      setIsAdminLoading(false);
    }
  }, [email]);

  return [isAdmin, isAdminLoading];
};

export default useAdmin;
