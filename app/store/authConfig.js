import { createSlice } from "@reduxjs/toolkit";

const intialState = {
    isLogin: false,
    access_token: null
};

const authConfigSlice = createSlice({
    name: "authconfig",
    initialState: intialState,
    reducers: {
        loginUser: (state, action) => {
            state.isLogin = true;
            state.access_token = action.payload;
        },
        logoutUser: (state, action) => {
            state.isLogin = false;
            state.access_token = null;
        }
    }
});

export const { loginUser, logoutUser } = authConfigSlice.actions;
export default authConfigSlice.reducer;