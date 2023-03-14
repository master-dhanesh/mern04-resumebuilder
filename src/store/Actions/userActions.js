import axios from "../../helpers/axiosconfig";
import { globleerr, loaduser } from "../Reducers/userSlice";

export const async_loaduser = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.post("/me");
        dispatch(loaduser(data.user));
    } catch (error) {
        dispatch(globleerr(error.response.data.message));
    }
};

export const async_signin = () => async (dispatch, getState) => {
    try {
        const d = await axios.post("/signin", {
            email: "john@doe.com",
            password: "123456",
        });
        console.log(d.data);
        // dispatch(async_loaduser());
    } catch (error) {
        dispatch(globleerr(error.response.data.message));
    }
};
