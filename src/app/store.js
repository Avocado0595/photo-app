import {configureStore} from "@reduxjs/toolkit";
import photoReducer from 'features/Photo/photoSlice';
import userReducer from 'features/User/UserSlice';
import SignInModalReducer from '../utils/ModalSlice/SignInModalSlice';
import SignUpModalReducer from '../utils/ModalSlice/SignUpModalSlice';

const rootReducer = {
    photos: photoReducer,
    user: userReducer,
    signInToggle: SignInModalReducer,
    signUpToggle: SignUpModalReducer
}
const store = configureStore({
    reducer:  rootReducer
})

export default store;