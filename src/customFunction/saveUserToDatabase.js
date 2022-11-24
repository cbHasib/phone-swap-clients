export const saveUserToDatabase = (user) => {
  const userDoc = {
    uid: user.uid,
    email: user.email,
    displayName: user.displayName,
    photoURL: user.photoURL,
    emailVerified: user.emailVerified,
    creationTime: user.metadata.creationTime,
  };

  // Save user to database
  fetch(`${process.env.REACT_APP_SERVER_URL}/user`, {
    method: "PUT",
    headers: {
      "content-type": "application/json",
    },
    body: JSON.stringify(userDoc),
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
    });
};
