import { useEffect } from "react";

const useTitle = (title) => {
  useEffect(() => {
    document.title = `${title} - ShikkhaNir`;
  }, [title]);
};

export default useTitle;
