import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
    const user = JSON.parse(localStorage.getItem("user")); // Check for logged-in user data in localStorage

    // If there is no user (not logged in), redirect to the login page
    if (!user) {
        return <Navigate to="/login" />;
    }

    // If user is logged in, render the protected page (CartPage in this case)
    return children;
};

export default ProtectedRoute;
