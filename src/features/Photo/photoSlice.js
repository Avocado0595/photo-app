const { createSlice } = require("@reduxjs/toolkit");

const photo = createSlice({
    name: 'photo',
    initialState: {photoList: []},
    reducers:{
        getPhotos:(state, action)=>{
            return {photoList: action.payload};
        },
        addPhoto: (state, action) =>{
            state.photoList.push(action.payload);
        },
        removePhoto: (state, action)=>{
            const photoId = action.payload;
            state.photoList = state.photoList.filter((item)=>item._id!==photoId);
        },
        editPhoto:(state, action)=>{
            const editedPhoto = action.payload;
            const photoIndex = state.photoList.findIndex(photo=> photo.id === editedPhoto.id);
            if (photoIndex >=0){
                state.photoList.[photoIndex] = editedPhoto;
            }
        }
    }
});

const {reducer,actions} = photo;
export const {addPhoto, removePhoto, editPhoto, getPhotos} = actions;

export default reducer;