import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - PhoneSwap`;
  }, [title]);
};

export default useTitle;
