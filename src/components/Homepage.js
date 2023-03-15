import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.userReducer);

    useEffect(() => {
        isAuthenticated && navigate("/profile");
    }, [isAuthenticated]);

    return <div>Homepage</div>;
};

export default Homepage;
