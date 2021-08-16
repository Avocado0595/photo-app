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
            return state.photoList.filter((item)=>item.id!==photoId);
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

/*
{id:1,title:'Img 1',
    categoryId:1,
    imgUrl:'https://picsum.photos/id/424/300/400'},
    {id:2,title:'Img 2',
    categoryId:3,
    imgUrl:'https://picsum.photos/id/1079/300/400'},
    {id:3,title:'Img 3',
    categoryId:2,
    imgUrl:'https://picsum.photos/id/450/300/400'},
    {id:4,title:'Img 4',
    categoryId:2,
    imgUrl:'https://picsum.photos/id/481/300/400'},
    {id:5,title:'Img 5',
    categoryId:1,
    imgUrl:'https://picsum.photos/id/484/300/400'},
    {id:6,title:'Img 6',
    categoryId:2,
    imgUrl:'https://picsum.photos/id/424/300/400'},
    {id:7,title:'Img 7',
    categoryId:3,
    imgUrl:'https://picsum.photos/id/424/300/400'}
*/