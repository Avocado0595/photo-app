const { createSlice } = require("@reduxjs/toolkit");

const ErrorModalSlice = createSlice({
    name: 'errorModal',
    initialState: {isOpen: false, errMessage: null},
    reducers:{
        openModal: (state, action)=>{
            return {isOpen: true, errMessage: action.payload}
        },
        closeModal: ()=>{
            return {isOpen: false, errMessage: null}
        }
    }
});

const {reducer,actions} = ErrorModalSlice;
export const errorActions = actions;

export default reducer;