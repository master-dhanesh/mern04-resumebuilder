import React from "react";
import { useSelector } from "react-redux";

const Profile = () => {
    const { user } = useSelector((state) => state.userReducer);

    return (
        <div>
            <h3>Profile</h3>
            {JSON.stringify(user)}
            <h3>{user.name}</h3>
            <img width={200} src={user.avatar.url} alt="" />
        </div>
    );
};

export default Profile;
