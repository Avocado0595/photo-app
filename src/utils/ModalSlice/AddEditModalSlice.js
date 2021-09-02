const { createSlice } = require("@reduxjs/toolkit");

const AddEditModalSlice = createSlice({
    name: 'addEditModal',
    initialState: {isOpen: false, isEdit: false, header: '', photoId:''},
    reducers:{
        openAddModal: (state, action)=>{
            const photoId = action.payload?action.payload:'';
            return {...state,isOpen: true, isEdit: false, header: 'Add photo', photoId:photoId}
        },
        openEditModal: (state,action)=>{
            return {...state, isOpen: true, isEdit: true, header: 'Edit photo', photoId: action.payload}
        },
        closeModal: (state)=>{
            return {...state, isOpen: false, isEdit: false, header: '', photoId:''}
        }
    }
});

const {reducer,actions} = AddEditModalSlice;
export const addEditActions = actions;

export default reducer;