export const getUsers = () =>
  JSON.parse(localStorage.getItem("users")) || [];

export const signup = (user) => {
  const users = getUsers();
  users.push(user);
  localStorage.setItem("users", JSON.stringify(users));
};

export const login = (email, password, role) => {
  const users = getUsers();
  const user = users.find(
    (u) => u.email === email && u.password === password && u.role === role
  );
  if (user) {
    localStorage.setItem("loggedInUser", JSON.stringify(user));
    return true;
  }
  return false;
};

export const logout = () => {
  localStorage.removeItem("loggedInUser");
};

export const getCurrentUser = () =>
  JSON.parse(localStorage.getItem("loggedInUser"));
