import React from "react";
import AuthService from "../services/auth.service";


const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  return (
    <h2>Profile</h2>
  );
};

export default Profile;