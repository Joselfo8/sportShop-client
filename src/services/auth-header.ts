function authHeader() {
  const data = localStorage.getItem("user");
  const user = data !== null && JSON.parse(data);

  if (!user && !user.accessToken) return { Authorization: "" };

  // if not work change to "x-access-token": user.accessToken
  return { Authorization: "Bearer " + user.accessToken };
}

export default authHeader;
