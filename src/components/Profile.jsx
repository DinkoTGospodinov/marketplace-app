import React, { useEffect, useState } from "react";
import axios from "axios";

const Profile = () => {
  const [user, setUser] = useState({});
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/users/profile/${userId}`
        );
        setUser(response.data);
      } catch (error) {
        console.error("Profile error:", error.response?.data || error.message);
      }
    };
    if (userId) {
      fetchUser();
    }
  }, [userId]);

  if(!userId){
    return <h2>Please login to view your profile</h2>
  }

  return user ? (
    <div className="container">
      <h2>Profile</h2>
      <p>Name: {user.name}</p>
      <p>Email: {user.email}</p>
    </div>
  ) : (
    <h2>Loading...</h2>
  )
};


export default Profile;