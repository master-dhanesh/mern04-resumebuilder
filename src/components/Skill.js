import React, { useState } from "react";

const Skill = () => {
    const skillTemplate = {
        name: "",
    };
    const [skill, setskill] = useState(
        JSON.parse(localStorage.getItem("skill")) || [skillTemplate]
    );

    const Changehandler = (e, index) => {
        const updatedskill = skill.map((ski, i) =>
            index == i ? { ...ski, [e.target.name]: e.target.value } : ski
        );
        setskill(updatedskill);
    };

    const AddHandler = () => {
        setskill([...skill, skillTemplate]);
    };
    const DeleteHandler = (index) => {
        const copyskill = [...skill];
        copyskill.splice(index, 1);
        setskill(copyskill);
        localStorage.setItem("skill", JSON.stringify(copyskill));
    };

    const Saveskill = () => {
        localStorage.setItem("skill", JSON.stringify(skill));
    };

    return (
        <div>
            {skill.map((e, idx) => (
                <div key={idx}>
                    <input
                        name="name"
                        type="text"
                        placeholder="Skill Name"
                        onChange={(e) => Changehandler(e, idx)}
                        value={skill[idx].name}
                    />

                    <span onClick={() => DeleteHandler(idx)}>❌</span>
                </div>
            ))}
            <button onClick={Saveskill}>Save</button> <br />
            <button onClick={AddHandler}>Add More</button>
        </div>
    );
};

export default Skill;
