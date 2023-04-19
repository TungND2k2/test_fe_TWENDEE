import { createSlice } from "@reduxjs/toolkit";
import {getUsers} from "../actions/user.acction";

const initialState = {
    users: [],
};

const userReducer = createSlice({
    name: "users",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getUsers.fulfilled, (state, action) => {
            if (Array.isArray(action.payload)) {
                state.usersSort = action.payload;

            }else {
                state.users = action.payload;
            }
        });
    },
});

export default userReducer.reducer;