import React, { useState } from "react";

const Education = () => {
    const educationTemplate = {
        institute: "",
        university: "",
        degree: "",
        grade: "",
        year: "",
    };
    const [education, setEducation] = useState(
        JSON.parse(localStorage.getItem("education")) || [educationTemplate]
    );

    const Changehandler = (e, index) => {
        const updatedEducation = education.map((edu, i) =>
            index == i ? { ...edu, [e.target.name]: e.target.value } : edu
        );
        setEducation(updatedEducation);
    };

    const AddHandler = () => {
        setEducation([...education, educationTemplate]);
    };
    const DeleteHandler = (index) => {
        const copyEducation = [...education];
        copyEducation.splice(index, 1);
        setEducation(copyEducation);
        localStorage.setItem("education", JSON.stringify(copyEducation));
    };

    const SaveEducation = () => {
        localStorage.setItem("education", JSON.stringify(education));
    };

    return (
        <div>
            {education.map((e, idx) => (
                <div key={idx}>
                    <input
                        name="institute"
                        type="text"
                        placeholder="Institute Name"
                        onChange={(e) => Changehandler(e, idx)}
                        value={education[idx].institute}
                    />
                    <input
                        name="university"
                        type="text"
                        placeholder="University Name"
                        onChange={(e) => Changehandler(e, idx)}
                        value={education[idx].university}
                    />
                    <input
                        name="degree"
                        type="text"
                        placeholder="Degree Name"
                        onChange={(e) => Changehandler(e, idx)}
                        value={education[idx].degree}
                    />
                    <input
                        name="grade"
                        type="text"
                        placeholder="Grade"
                        onChange={(e) => Changehandler(e, idx)}
                        value={education[idx].grade}
                    />
                    <input
                        name="year"
                        type="text"
                        placeholder="Year"
                        onChange={(e) => Changehandler(e, idx)}
                        value={education[idx].year}
                    />
                    <span onClick={() => DeleteHandler(idx)}>❌</span>
                </div>
            ))}
            <button onClick={SaveEducation}>Save</button> <br />
            <button onClick={AddHandler}>Add More</button>
        </div>
    );
};

export default Education;
