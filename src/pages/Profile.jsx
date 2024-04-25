import React, { useState, useEffect } from "react";
import { StickyNavbar } from "../components/StickyNavbar";

const Profile = () => {
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
        // console.log(data.user);
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
  return (
    <div>
      <StickyNavbar />
      <h1>{user && user.email}</h1>
    </div>
  );
};

export default Profile;
