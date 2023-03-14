import React, { useEffect } from "react";
import { async_loaduser, async_signin } from "./store/Actions/userActions";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

const App = () => {
    const dispatch = useDispatch();
    const { errors } = useSelector((state) => state.userReducer);

    useEffect(() => {
        dispatch(async_loaduser());
    }, []);

    if (errors.length > 0) {
        errors.forEach((err) => {
            toast.error(err);
        });
    }

    return (
        <div>
            <button onClick={() => dispatch(async_signin())}>Login User</button>
        </div>
    );
};

export default App;
