export const getDbUser = async (email) => {
  if (!email) return null;

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/users/${email}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    }
  );

  const data = await response.json();

  if (data.success) {
    console.log(data);
    return data.data;
  }
  return null;
};
