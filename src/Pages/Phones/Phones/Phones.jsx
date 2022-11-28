import { useQuery } from "@tanstack/react-query";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ErrorMessage from "../../Shared/ErrorMessage/ErrorMessage";
import LoadingSpinner from "../../Shared/LoadingSpinner/LoadingSpinner";
import PhonesCardHor from "../PhonesCardHor/PhonesCardHor";

const Phones = () => {
  const [errorMessage, setErrorMessage] = useState("");
  const { id } = useParams();
  const {
    data: phonesData = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["phonesData"],
    queryFn: async () => {
      const res = await fetch(
        `${process.env.REACT_APP_API_URL}/products/category/${id}`
      );
      const data = await res.json();

      if (data.success) {
        setErrorMessage("");
        return data.data;
      } else {
        setErrorMessage(data.error);
        return [];
      }
    },
  });

  useEffect(() => {
    refetch();
  }, [id, refetch]);

  if (isLoading) {
    return <LoadingSpinner />;
  }
  if (errorMessage) {
    return <ErrorMessage error={errorMessage} />;
  }

  return (
    <div className="flex flex-col gap-4">
      {phonesData?.map((phone) => (
        <PhonesCardHor key={phone._id} product={phone} />
      ))}
    </div>
  );
};

export default Phones;
