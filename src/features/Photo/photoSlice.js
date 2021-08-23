
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
        editPhoto: (state, action)=>{
            const editedPhoto = action.payload;
            const photoIndex =  state.photoList.findIndex(photo=> photo._id === editedPhoto._id);
            const photoIndexA = state.photobyAuthor.findIndex(photo=> photo._id === editedPhoto._id);
            if (photoIndexA >=0 && photoIndex >=0){
                state.photobyAuthor[photoIndexA] = editedPhoto;
                state.photoList[photoIndex] = editedPhoto;
            }
            return state;
           // return {...state, photoList: [...state.photoList],photobyAuthor:[...state.photobyAuthor] };
        },
        likePhoto: (state, action)=>{
            
            const {id, userId} = action.payload;
            const photoIndex = state.photoList.findIndex(photo=> photo._id === id);
            const checkExist = state.photoList[photoIndex].likeCount.findIndex(item=>item === userId);
            if(photoIndex!==-1 && checkExist===-1){
                state.photoList[photoIndex].likeCount.push(userId);
            }            
        },
        unlikePhoto: (state, action)=>{
            const {id, userId} = action.payload;
            const photoIndex = state.photoList.findIndex(photo=> photo._id === id);
            const checkExist = state.photoList[photoIndex].likeCount.findIndex(item=>item === userId);
            if(photoIndex!==-1 && checkExist!==-1){
                state.photoList[photoIndex].likeCount = state.photoList[photoIndex].likeCount.filter(i=>i!==userId);
            }  
        }

    }
});

const {reducer,actions} = photo;
export const {addPhoto, removePhoto, editPhoto, getPhotosSuccess,getPhotosProcess,getPhotosFail,
    getPhotosByAuthorProcess, getPhotosByAuthorSuccess, getPhotosByAuthorFail, likePhoto, unlikePhoto} = actions;

export default reducer;