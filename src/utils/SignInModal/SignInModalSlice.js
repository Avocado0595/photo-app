const { createSlice } = require("@reduxjs/toolkit");

const SignInModalSlice = createSlice({
    name: 'signInModal',
    initialState: { isToggleSignIn: false},
    reducers:{
        toggleSignIn: (state, action)=>{
            state.isToggleSignIn = !state.isToggleSignIn}
        }
    });

const {reducer,actions} = SignInModalSlice;
export const { toggleSignIn} = actions;

export default reducer;