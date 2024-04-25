import React, { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Navigate, Outlet } from "react-router-dom";

const PrivateRoutes = () => {
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true); // Add loading state

  const fetchUser = async () => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_BACKEND_URL}/api/auth/profile`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      const data = await response.json();
      if (data.success) {
        console.log(data.user);
        setUser(data.user);
      }
    } catch (error) {
      toast.error(error.message);
    } finally {
      setIsLoading(false); // Set loading state to false regardless of success or error
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  // Render loading state while user data is being fetched
  //   if (isLoading) {
  //     return <div>Loading...</div>;
  //   }

  // Render Outlet if user is authenticated, otherwise navigate to sign-in page
  if (!isLoading) {
    if (user !== null) {
      return <Outlet />;
    } else {
      return <Navigate to="/signin" />;
    }
  }
};

export default PrivateRoutes;
