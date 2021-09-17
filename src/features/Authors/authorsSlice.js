

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
        addAuthor: (state, action) =>{
            return {authorList:[...state.authorList, action.payload], isLoading: false}
        },
        updateAuthor :(state, action)=>{
            const updateUser = action.payload;
            const findOld = state.authorList.findIndex(a=>a.uid===updateUser.uid);
            state.authorList[findOld] = updateUser;
        }

    }
});

const {reducer,actions} = authorsSlice;
export const {getAuthorsProcess, getAuthorsSuccess, getAuthorsFail, addAuthor,updateAuthor} = actions;

export default reducer;