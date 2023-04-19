import {configureStore} from "@reduxjs/toolkit";
import userReducer from "../user/redux/reducers/user.reducer";

const store = configureStore({
    reducer: {
        users: userReducer,
    },
});
export default store;