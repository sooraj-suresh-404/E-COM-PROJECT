import React, { createContext, useContext, useState } from "react";

// Create UserContext
const UserContext = createContext();

// UserProvider
export const UserProvider = ({ children }) => {
  const [email, setEmail] = useState(() => {
    const storedEmail = localStorage.getItem("email");
    console.log("Initial Email from Local Storage:", storedEmail);
    return storedEmail || "";
  });
  const [name, setName] = useState(() => {
    const storedName = localStorage.getItem("name");
    console.log("Initial Name from Local Storage:", storedName);
    return storedName || "";
  });

  // Handle Login
  const handleLogin = (userEmail, userName) => {
    console.log("Logging in with Email:", userEmail, "Name:", userName);
    localStorage.setItem("email", userEmail);
    localStorage.setItem("name", userName);
    setEmail(userEmail);
    setName(userName);
  };

  // Handle Logout
  const handleLogout = () => {
    console.log("Logging out");
    localStorage.removeItem("email");
    localStorage.removeItem("name");
    setEmail("");
    setName("");
  };

  return (
    <UserContext.Provider
      value={{
        email,
        name,
        handleLogin,
        handleLogout,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for ease of use
export const useUser = () => useContext(UserContext);