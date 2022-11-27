import { Button } from "flowbite-react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { HiTrash } from "react-icons/hi";
import ErrorMessage from "../../../Shared/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../../Shared/LoadingSpinner/LoadingSpinner";

const Buyers = () => {
  const [load, setLoad] = useState(false);
  const [errorMessages, setErrorMessages] = useState("");
  const [buyers, setBuyers] = useState([]);

  useEffect(() => {
    setLoad(true);
    const getBuyers = async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/users?role=buyer`
      );
      const data = await res.json();

      if (data.success) {
        setBuyers(data.data);
        setErrorMessages("");
        setLoad(false);
      } else {
        setErrorMessages(data.errorMessages);
        setLoad(false);
      }
    };
    getBuyers();
  }, []);

  const handleDeleteBuyer = (id) => {
    toast.success(`Deleted ${id}`);
  };

  const handleMakeAdmin = (id) => {
    toast.success(`Admin ${id}`);
  };

  if (load) {
    return <LoadingSpinner />;
  }

  if (errorMessages) {
    return <ErrorMessage error={errorMessages} />;
  }

  return (
    <div className="px-5">
      <h4 className="mb-4 text-2xl font-semibold text-gray-600 dark:text-gray-300">
        All Buyers
      </h4>
      <div className="w-full overflow-hidden rounded-lg shadow-xs">
        <div className="w-full overflow-x-auto">
          <table className="w-full whitespace-no-wrap ">
            <thead>
              <tr className="text-xs font-semibold tracking-wide text-left text-gray-700 uppercase border-b dark:border-gray-700 bg-gray-300 dark:text-gray-400 dark:bg-black">
                <th className="px-4 py-3">Buyer</th>
                <th className="px-4 py-3">phone</th>
                <th className="px-4 py-3">Joined</th>
                <th className="px-4 py-3">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y dark:divide-gray-700 dark:bg-gray-900">
              {buyers?.map((buyer) => (
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
                  <td className="px-4 py-3">
                    <div className="flex items-center space-x-3 text-sm">
                      <button
                        className="flex items-center justify-between py-2 text-sm font-medium leading-5 text-blue-700 rounded-lg dark:text-gray-400 dark:hover:text-white hover:text-blue-900 focus:outline-none focus:shadow-outline-gray"
                        aria-label="Delete"
                        title="Delete This Buyer"
                        onClick={() => handleDeleteBuyer(buyer?._id)}
                      >
                        <HiTrash className="w-5 h-5" />
                      </button>

                      <Button
                        onClick={() => handleMakeAdmin(buyer?._id)}
                        size="xs"
                        color="warning"
                        title={
                          buyer?.role === "admin"
                            ? "Already an Admin"
                            : "Change to Admin"
                        }
                        disabled={buyer?.role === "admin" ? true : false}
                      >
                        Make Admin
                      </Button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Buyers;
