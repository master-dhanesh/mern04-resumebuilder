import MultiStep from "react-multistep";
import Education from "./Education";
import Skill from "./Skill";
import Project from "./Project";
import Experience from "./Experience";
import Interest from "./Interest";
const CreateResume = () => {
    const steps = [
        { name: "Education", component: <Education /> },
        { name: "Skill", component: <Skill /> },
        { name: "Project", component: <Project /> },
        { name: "Experience", component: <Experience /> },
        { name: "Interest", component: <Interest /> },
    ];
    return (
        <div>
            <MultiStep showNavigation={true} steps={steps} />
        </div>
    );
};

export default CreateResume;
