export const setJwtToken = async (email) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/token?email=${email}`
  );

  const data = await response.json();

  // SET TOKEN TO LOCAL STORAGE
  if (data.success) {
    localStorage.setItem("token", data.token);
  }
};
