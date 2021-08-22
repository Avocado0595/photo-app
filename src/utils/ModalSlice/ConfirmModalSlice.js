const { createSlice } = require("@reduxjs/toolkit");

const ConfirmModalSlice = createSlice({
    name: 'confirmModal',
    initialState: {isOpen: false, itemId: null, title: ''},
    reducers:{
        openModal: (state, action)=>{
            return {isOpen: true, itemId: action.payload.id, title: action.payload.title}
        },
        closeModal: ()=>{
            return {isOpen: false,  itemId: null}
        }
    }
});

const {reducer,actions} = ConfirmModalSlice;
export const confirmActions = actions;

export default reducer;