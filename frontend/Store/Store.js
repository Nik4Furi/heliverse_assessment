import { configureStore } from "@reduxjs/toolkit";
import UsersSlice from "./UsersSlice";


const Store = configureStore({
    reducer : {
        user : UsersSlice
    }
})

export default Store;