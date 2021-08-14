import {configureStore} from "@reduxjs/toolkit";
import photoReducer from 'features/Photo/photoSlice';
import userReducer from 'features/User/UserSlice';
import SignInModalReducer from '../utils/SignInModal/SignInModalSlice';
const rootReducer = {
    photos: photoReducer,
    user: userReducer,
    signInModal: SignInModalReducer
}
const store = configureStore({
    reducer:  rootReducer
})

export default store;