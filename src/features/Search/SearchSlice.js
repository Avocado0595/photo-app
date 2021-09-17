const { createSlice } = require("@reduxjs/toolkit");

const searchSlice = createSlice({
    name: 'search',
    initialState: { keyword: '', photos: [], isLoading: false},
    reducers:{
        getKeyword: (state, action) =>{
            return {...state, keyword: action.payload};
        },
        clearKeyword: (state)=>{
            return {...state, keyword: ''};
        },
        getPhotoProcess: (state, action)=>{
            return {...state, isLoading: true};
        },
        getPhotoSuccess: (state, action)=>{
            return {...state, isLoading: false, photos: action.payload};
        },
        getPhotoFail:(state)=>{
            return {...state, isLoading: false};
        }
    }
});

const {reducer,actions} = searchSlice;
export const {getKeyword, clearKeyword, getPhotoProcess, getPhotoSuccess, getPhotoFail} = actions;

export default reducer;