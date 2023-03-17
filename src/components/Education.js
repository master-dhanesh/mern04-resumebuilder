import React, { useState } from "react";
import DynamicForm from "dynamic-form-json";

const Education = () => {
    const [create, setCreate] = useState({
        id: "",
        placeholder: "",
        type: "text",
        validationType: "string",
        validations: [
            {
                type: "required",
                params: ["field is required"],
            },
        ],
    });

    const [formData, setFormData] = useState([]);
    const ChangeHandler = (e) => {
        setCreate({ ...create, [e.target.name]: e.target.value });
    };

    const CreateElementHandler = (e) => {
        e.preventDefault();
        setFormData([...formData, create]);
        setCreate({
            id: "",
            placeholder: "",
            type: "text",
            validationType: "string",
            validations: [
                {
                    type: "required",
                    params: ["field is required"],
                },
            ],
        });
    };

    const EducationHandler = (formData) => {
        console.log(formData);
    };

    return (
        <div>
            <h3>Education</h3>
            <form onSubmit={CreateElementHandler}>
                <input
                    type="text"
                    name="id"
                    value={create.id}
                    onChange={ChangeHandler}
                    placeholder="Name of the Field"
                />
                <input
                    type="text"
                    name="placeholder"
                    value={create.placeholder}
                    onChange={ChangeHandler}
                    placeholder="Placeholder of the Field"
                />

                <button>Create Element</button>
            </form>
            <hr />
            <DynamicForm fields={formData} cbSubmit={EducationHandler} />
        </div>
    );
};

export default Education;
