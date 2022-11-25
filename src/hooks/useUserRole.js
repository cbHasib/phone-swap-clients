import { useEffect, useState } from "react";

const useUserRole = (email) => {
  const [userRole, setUserRole] = useState("buyer");
  const [isUserRoleLoading, setIsUserRoleLoading] = useState(true);
  useEffect(() => {
    if (email) {
      fetch(`${process.env.REACT_APP_SERVER_URL}/users/role/${email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          setUserRole(data.data.role);
          setIsUserRoleLoading(false);
        });
    }
  }, [email]);
  return [userRole, isUserRoleLoading];
};

export default useUserRole;
