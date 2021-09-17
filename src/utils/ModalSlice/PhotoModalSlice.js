const { createSlice } = require("@reduxjs/toolkit");

const PhotoModalSlice = createSlice({
    name: 'photoModal',
    initialState: {isOpen: false, photo: null},
    reducers:{
        openModal: (state, action)=>{
            const {photo} = action.payload;
            return {isOpen: true, photo: photo};
        },
        closeModal: ()=>{
            return {isOpen: false, photo: null};
        }
    }
});

const {reducer,actions} = PhotoModalSlice;
export const photoModalActions = actions;

export default reducer;