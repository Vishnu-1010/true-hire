// configure the store
import {configureStore} from "@reduxjs/toolkit";
import auth from "../store/Slice"
const Store = configureStore({
    reducer :{
    auth : auth,
    }
});

export default Store;