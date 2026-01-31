import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user.jsx";
import { sellerReducer } from "./reducers/seller.jsx";


const Store = configureStore({
    reducer: {
        user: userReducer,
        seller: sellerReducer,
    },
})

export default Store;