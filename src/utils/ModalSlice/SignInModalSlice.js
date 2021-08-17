const { createSlice } = require("@reduxjs/toolkit");

const SignInModalSlice = createSlice({
    name: 'signInModal',
    initialState: {isOpen: false},
    reducers:{
        openModal: ()=>{
            return {isOpen: true}
        },
        closeModal: ()=>{
            return {isOpen: false}
        }
    }
});

const {reducer,actions} = SignInModalSlice;
export const signInActions = actions;

export default reducer;