import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user.jsx";


const Store = configureStore({
    reducer: {
        user: userReducer,
    }
})

export default Store;