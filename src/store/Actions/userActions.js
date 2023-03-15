import axios from "../../helpers/axiosconfig";
import { _error, loaduser, removeuser } from "../Reducers/userSlice";

export * from "../Reducers/userSlice";
export const async_loaduser = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.post("/me");
        dispatch(loaduser(data.user));
    } catch (error) {
        dispatch(_error(error.response.data.message));
    }
};

export const async_removeuser = () => async (dispatch, getState) => {
    try {
        await axios.get("/signout");
        dispatch(removeuser());
    } catch (error) {
        dispatch(_error(error.response.data.message));
    }
};

export const async_signin = () => async (dispatch, getState) => {
    try {
        const d = await axios.post("/signin", {
            email: "john@doe.com",
            password: "123456",
        });
        // console.log(d.data);
        dispatch(async_loaduser());
    } catch (error) {
        dispatch(_error(error.response.data.message));
    }
};
