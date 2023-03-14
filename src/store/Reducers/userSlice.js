import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    user: null,
    isAuthenticated: false,
    errors: [],
};

export const userSlice = createSlice({
    name: "counter",
    initialState,
    reducers: {
        loaduser: (state, action) => {
            state.user = action.payload;
        },
        globleerr: (state, action) => {
            state.errors.push(action.payload);
        },
    },
});

// Action creators are generated for each case reducer function
export const { loaduser, globleerr } = userSlice.actions;

export default userSlice.reducer;
