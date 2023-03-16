import axios from "../../helpers/axiosconfig";
import { _error, loaduser, removeuser } from "../Reducers/userSlice";

export * from "../Reducers/userSlice";
export const async_loaduser = () => async (dispatch, getState) => {
    try {
        const { data } = await axios.post("/me");
        dispatch(loaduser(data.user));
    } catch (error) {
        dispatch(_error(error.response.data.message));
        // console.log(error.response.data);
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
            password: "654321",
        });
        // console.log(d.data);
        dispatch(async_loaduser());
    } catch (error) {
        dispatch(_error(error.response.data.message));
    }
};

export const async_sendmail = () => async (dispatch, getState) => {
    try {
        const d = await axios.post("/send-mail", {
            email: "sheryians.community@gmail.com",
        });
        console.log(d.data);
    } catch (error) {
        console.log(error);
        dispatch(_error(error.response.data.message));
    }
};

export const async_verifyotp = () => async (dispatch, getState) => {
    try {
        const d = await axios.post("/verify-otp", {
            email: "sheryians.community@gmail.com",
            otp: "1234",
            password: "654321",
        });
        // console.log(d.data);
    } catch (error) {
        dispatch(_error(error.response.data.message));
    }
};

export const async_resetpassword = (id) => async (dispatch, getState) => {
    try {
        const d = await axios.post("/reset-password/" + id, {
            oldpassword: "123456",
            newpassword: "654321",
        });
        // console.log(d.data);
    } catch (error) {
        dispatch(_error(error.response.data.message));
    }
};
