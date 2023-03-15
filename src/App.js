import React, { useEffect } from "react";
import { async_loaduser } from "./store/Actions/userActions";
import { useDispatch } from "react-redux";
import Navigation from "./components/Navigation";
import { Route, Routes } from "react-router-dom";
import Homepage from "./components/Homepage";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Profile from "./components/Profile";
import ProtectedRoute from "./helpers/ProtectedRoute";

const App = () => {
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(async_loaduser());
    }, []);

    return (
        <div>
            <Navigation />
            <hr />
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/signin" element={<Signin />} />
                {/* ------------------------------------------------------- */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
