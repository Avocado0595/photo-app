import {configureStore} from "@reduxjs/toolkit";
import photoReducer from 'features/Photo/photoSlice';
import userReducer from 'features/User/UserSlice';
import collectionReducer from 'features/Collection/CollectionSlice';
import authorReducer from 'features/Authors/authorsSlice';
import SignInModalReducer from 'utils/ModalSlice/SignInModalSlice';
import SignUpModalReducer from 'utils/ModalSlice/SignUpModalSlice';
import ErrorModalReducer from 'utils/ModalSlice/ErrorModalSlice';
import ConfirmModalReducer from 'utils/ModalSlice/ConfirmModalSlice';
import AddEditModalReducer from 'utils/ModalSlice/AddEditModalSlice';
import SearchReducer from 'features/Search/SearchSlice';
const rootReducer = {
    photos: photoReducer,
    user: userReducer,
    collection: collectionReducer,
    signInToggle: SignInModalReducer,
    signUpToggle: SignUpModalReducer,
    ErrorToggle: ErrorModalReducer,
    ConfirmToggle: ConfirmModalReducer,
    AddEditToggle: AddEditModalReducer,
    author: authorReducer,
    search: SearchReducer,
}
const store = configureStore({
    reducer:  rootReducer
})

export default store;