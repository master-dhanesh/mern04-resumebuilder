import React from "react";
import { useSelector } from "react-redux";

const ProfessionalResume = () => {
    const r = useSelector((state) => state.userReducer.user.resumes);
    console.log(r);
    return <div>ProfessionalResume</div>;
};

export default ProfessionalResume;
