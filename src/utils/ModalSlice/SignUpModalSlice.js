const { createSlice } = require("@reduxjs/toolkit");

const SignUpModalSlice = createSlice({
    name: 'signUpModal',
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

const {reducer,actions} = SignUpModalSlice;
export const signUpActions =actions;

export default reducer;