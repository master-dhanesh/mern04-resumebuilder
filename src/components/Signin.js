import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { async_signin } from "../store/Actions/userActions";

const Signin = () => {
    const dispatch = useDispatch();

    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.userReducer);

    useEffect(() => {
        isAuthenticated && navigate("/profile");
    }, [isAuthenticated]);

    return (
        <div>
            <h4>Signin</h4>
            <button onClick={() => dispatch(async_signin())}>Signin</button>
            <Link to="/sendmail">Forget Password</Link>
        </div>
    );
};

export default Signin;
