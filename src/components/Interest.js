import React from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { async_createresume } from "../store/Actions/userActions";

const Interest = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const SaveResumeHandler = async () => {
        await dispatch(async_createresume());
        navigate("/profile");
    };

    return (
        <div>
            <h2>Interest</h2>
            <button onClick={SaveResumeHandler}>Save Resume Details</button>
        </div>
    );
};

export default Interest;
