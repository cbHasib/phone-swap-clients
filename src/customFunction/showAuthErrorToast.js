import toast from "react-hot-toast";
import { getAuthErrorMessage } from "./getAuthErrorMessage";

export const showAuthErrorToast = (error) => {
  const errorMessage = getAuthErrorMessage(error);
  if (errorMessage) {
    toast.error(errorMessage);
  }
};
