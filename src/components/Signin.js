import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { async_signin } from "../store/Actions/userActions";

const Signin = () => {
    const dispatch = useDispatch();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const navigate = useNavigate();
    const { isAuthenticated } = useSelector((state) => state.userReducer);

    useEffect(() => {
        isAuthenticated && navigate("/profile");
    }, [isAuthenticated]);

    const SignInHandler = (e) => {
        e.preventDefault();
        dispatch(async_signin({ email, password }));
        //  email: "john@doe.com",
        //     password: "654321",
    };

    return (
        <div>
            <h4>Signin</h4>

            <form onSubmit={SignInHandler}>
                <input
                    type="text"
                    placeholder="Email"
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input
                    type="password"
                    placeholder="Password"
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button>Signin</button>
            </form>

            <Link to="/sendmail">Forget Password</Link>
        </div>
    );
};

export default Signin;
