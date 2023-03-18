import React, { useEffect } from "react";
import "./style.css";
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
import CreateResume from "./components/CreateResume";
import Templates from "./components/Templates";
import ProfessionalResume from "./components/resumetemplates/ProfessionalResume";

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
                <Route
                    path="/create-resume"
                    element={
                        <ProtectedRoute>
                            <CreateResume />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/templates"
                    element={
                        <ProtectedRoute>
                            <Templates />
                        </ProtectedRoute>
                    }
                >
                    <Route
                        path="/templates/1"
                        element={<ProfessionalResume />}
                    />
                </Route>
            </Routes>
        </div>
    );
};

export default App;
