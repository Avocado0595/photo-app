

const { createSlice } = require("@reduxjs/toolkit");

const authorsSlice = createSlice({
    name: 'author',
    initialState: { authorList: [], isLoading: false},
    reducers:{
        getAuthorsProcess: (state, action) =>{
            return {...state, isLoading: true}
        },
        getAuthorsSuccess: (state, action) =>{
            return {authorList: action.payload, isLoading: false}
        },
        getAuthorsFail: (state, action) =>{
            return {...state, isLoading: false}
        },

    }
});

const {reducer,actions} = authorsSlice;
export const {getAuthorsProcess, getAuthorsSuccess, getAuthorsFail} = actions;

export default reducer;