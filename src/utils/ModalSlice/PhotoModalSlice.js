const { createSlice } = require("@reduxjs/toolkit");

const PhotoModalSlice = createSlice({
    name: 'photoModal',
    initialState: {isOpen: false, PhotoComponent: null},
    reducers:{
        openModal: (state, action)=>{
            return {isOpen: true, PhotoComponent: action.payload}
        },
        closeModal: ()=>{
            return {isOpen: false,  PhotoComponent: null}
        }
    }
});

const {reducer,actions} = PhotoModalSlice;
export const photoModalActions = actions;

export default reducer;