

const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
    name: 'user',
    initialState: {currentUser: null},
    reducers:{
        setCurrentUser: (state, action) =>{
            state.currentUser = action.payload;
        },
        signOut: (state, action)=>{
            state.currentUser= null;
        }

    }
});

const {reducer,actions} = userSlice;
export const {setCurrentUser, signOut} = actions;

export default reducer;