

const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
    name: 'user',
    initialState: {currentUser: null, otherAuthors: []},
    reducers:{
        setCurrentUser: (state, action) =>{
            state.currentUser = action.payload;
        },
        signOut: (state, action)=>{
            state.currentUser= null;
        },
        getOtherAuthor: (state, action)=>{
            state.otherAuthors = action.payload;
        }

    }
});

const {reducer,actions} = userSlice;
export const {setCurrentUser, signOut, getOtherAuthor} = actions;

export default reducer;