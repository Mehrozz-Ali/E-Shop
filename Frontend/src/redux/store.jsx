import { configureStore } from "@reduxjs/toolkit";
import { userReducer } from "./reducers/user.jsx";
import { sellerReducer } from "./reducers/seller.jsx";
import { productReducer } from "./reducers/product.jsx";


const Store = configureStore({
    reducer: {
        user: userReducer,
        seller: sellerReducer,
        products: productReducer,

    },
})

export default Store;