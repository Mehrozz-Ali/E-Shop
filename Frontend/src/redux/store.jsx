import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user.jsx";
import { sellerReducer } from "./reducers/seller.jsx";
import { productReducer } from "./reducers/product.jsx";
import { eventReducer } from "./reducers/event.jsx";

const Store = configureStore({
    reducer: {
        user: userReducer,
        seller: sellerReducer,
        product: productReducer,
        events: eventReducer,
    },
})

export default Store;