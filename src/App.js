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
import Sendmail from "./components/Sendmail";
import Verifyotp from "./components/Verifyotp";
import Reset from "./components/Reset";

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
                <Route path="/sendmail" element={<Sendmail />}>
                    <Route
                        path="/sendmail/:email/verify"
                        element={<Verifyotp />}
                    />
                </Route>

                {/* ------------------------------------------------------- */}
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute>
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/reset"
                    element={
                        <ProtectedRoute>
                            <Reset />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
};

export default App;
