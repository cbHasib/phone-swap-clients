export const setJwtToken = async (user) => {
  const currentUser = {
    email: user.email,
    uid: user.uid,
    displayName: user.displayName,
  };

  fetch(`${process.env.REACT_APP_SERVER_URL}/jwt`, {
    method: "POST",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(currentUser),
  })
    .then((res) => res.json())
    .then((data) => {
      // SET TOKEN TO LOCAL STORAGE
      if (data.token) {
        localStorage.setItem("token", data.token);
      }
    });
};
