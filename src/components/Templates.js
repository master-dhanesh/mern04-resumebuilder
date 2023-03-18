import React from "react";
import { Link, Outlet } from "react-router-dom";
const Templates = () => {
    return (
        <div>
            <h3>Templates</h3>
            <Link to="/templates/1">Professional Resume</Link>
            <hr />
            <Outlet />
        </div>
    );
};

export default Templates;
