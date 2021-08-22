const { createSlice } = require("@reduxjs/toolkit");

const photo = createSlice({
    name: 'photo',
    initialState: {photoList: [], isLoading: false,photobyAuthor:[], isLoadingPhotoByAuthor:false},
    reducers:{
        getPhotosProcess:(state)=>{
            return {...state,isLoading:true};
        },
        getPhotosSuccess:(state, action)=>{
            return {...state,photoList: action.payload, isLoading: false};
        },
        getPhotosFail:(state)=>{
            return {...state, isLoading: false};
        },

        getPhotosByAuthorProcess:(state)=>{
            return {...state,isLoadingPhotoByAuthor:true};
        },
        getPhotosByAuthorSuccess:(state, action)=>{
            return {...state,photobyAuthor: action.payload, isLoadingPhotoByAuthor: false};
        },
        getPhotosByAuthorFail:(state)=>{
            return {...state, isLoadingPhotoByAuthor: false};
        },


        addPhoto: (state, action) =>{
            return {...state, photoList: [...state.photoList, action.payload], photobyAuthor:[...state.photobyAuthor, action.payload]};
        },
        removePhoto: (state, action)=>{
            const photoId = action.payload;
            const newphotoList = state.photoList.filter((item)=>item._id!==photoId);
            const newphotobyAuthor = state.photobyAuthor.filter((item)=>item._id!==photoId);
            return {...state,photoList: newphotoList,photobyAuthor: newphotobyAuthor  };
        },
        editPhoto:(state, action)=>{
            const editedPhoto = action.payload;
            const photoIndex = state.photoList.findIndex(photo=> photo.id === editedPhoto._id);
            if (photoIndex >=0){
                state.photoList[photoIndex] = editedPhoto;
            }
            const photoIndexA = state.photobyAuthor.findIndex(photo=> photo.id === editedPhoto._id);
            if (photoIndexA >=0){
                state.photobyAuthor[photoIndexA] = editedPhoto;
            }
        }
    }
});

const {reducer,actions} = photo;
export const {addPhoto, removePhoto, editPhoto, getPhotosSuccess,getPhotosProcess,getPhotosFail,
    getPhotosByAuthorProcess, getPhotosByAuthorSuccess, getPhotosByAuthorFail} = actions;

export default reducer;