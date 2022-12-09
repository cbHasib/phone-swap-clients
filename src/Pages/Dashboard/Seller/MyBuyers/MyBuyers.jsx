import React, { useContext, useState } from "react";
import { useEffect } from "react";
import { AuthContext } from "../../../../Contexts/UserContext";
import useDbUser from "../../../../hooks/useDbUser";
import useScrollToTop from "../../../../hooks/useScrollToTop";
import useTitle from "../../../../hooks/useTitle";
import ErrorMessage from "../../../Shared/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";

const MyBuyers = () => {
  useScrollToTop();
  useTitle("My Buyers");
  const { user, loading } = useContext(AuthContext);
  const [dbUser, isDbUserLoading] = useDbUser(user?.email);
  const [errorMessage, setErrorMessage] = useState("");
  const [myBuyers, setMyBuyers] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (dbUser) {
      setIsLoading(true);
      fetch(
        `${process.env.REACT_APP_API_URL}/buyer-list/6384c62be1ca045e92b5e17e`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data.success) {
            setMyBuyers(data.data);
            setErrorMessage("");
          } else {
            setErrorMessage(data.error);
          }
          setIsLoading(false);
        });
    }
  }, [dbUser]);

  if (loading || isDbUserLoading || isLoading || !dbUser)
    return <LoadingSpinner />;

  if (errorMessage) return <ErrorMessage error={errorMessage} />;

  return (
    <div className="px-5">
      <h4 className="mb-4 text-2xl font-semibold text-gray-600 dark:text-gray-300">
        My Buyers
      </h4>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap ">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-700 uppercase border-b dark:border-gray-700 bg-gray-300 dark:text-gray-400 dark:bg-black">
                <th className="px-4 py-3">Buyer</th>
                <th className="px-4 py-3">phone</th>
                <th className="px-4 py-3">Joined</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-900">
              {myBuyers?.map((buyer) => (
                <tr
                  className="text-gray-700 dark:text-gray-400"
                  key={buyer?._id}
                >
                  <td className="px-4 py-3">
                    <div className="flex items-center text-sm">
                      {/* <!-- Avatar with inset shadow --> */}
                      <div className="relative hidden w-8 h-8 mr-3 rounded-full md:block">
                        <img
                          className="object-cover w-full h-full rounded-full"
                          src={buyer?.image}
                          alt=""
                          loading="lazy"
                        />
                        <div
                          className="absolute inset-0 rounded-full shadow-inner"
                          aria-hidden="true"
                        ></div>
                      </div>
                      <div>
                        <p className="font-semibold">{buyer?.name}</p>
                        <p className="text-xs text-gray-600 dark:text-gray-400">
                          {buyer?.email}
                        </p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-3 text-sm">{buyer?.phone}</td>

                  <td className="px-4 py-3 text-sm">{buyer?.joinDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default MyBuyers;
