import axios from "axios";
import React, { useEffect } from "react";

const App = () => {
    const getApi = async () => {
        console.log(process.env.REACT_APP_API_URL);
        try {
            const d = await axios.get(process.env.REACT_APP_API_URL);
            console.log(d);
        } catch (error) {
            console.log(error.response);
        }
    };

    useEffect(() => {
        getApi();
    }, []);

    return <div>App</div>;
};

export default App;
