import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Signup = () => {
    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.userReducer);

    useEffect(() => {
        isAuthenticated && navigate("/profile");
    }, [isAuthenticated]);
    return <div>Signup</div>;
};

export default Signup;
