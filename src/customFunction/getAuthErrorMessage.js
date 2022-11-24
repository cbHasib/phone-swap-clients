export const getAuthErrorMessage = (error) => {
  const errorCode = error?.code;
  if (errorCode) {
    const errorText = errorCode.split("/")[1];
    const arr = errorText.split("-");
    for (let i = 0; i < arr.length; i++) {
      arr[i] = arr[i].charAt(0).toUpperCase() + arr[i].slice(1);
    }
    const errorMessage = arr.join(" ");
    return errorMessage;
  } else {
    const errorMessage = "Something went wrong";
    return errorMessage;
  }
};
