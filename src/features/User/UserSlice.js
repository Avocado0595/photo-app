const { createSlice } = require("@reduxjs/toolkit");

const userSlice = createSlice({
    name: 'user',
    initialState: {currentUser: null},
    reducers:{
        setCurrentUser: (state, action) =>{
            const {googleUser, databaseUser} = action.payload;
            const photoURL = databaseUser?databaseUser.photoURL.includes('avatars')?`${process.env.REACT_APP_API_URL_IMG}${databaseUser.photoURL}`:databaseUser.photoURL:googleUser.photoURL;
            if(databaseUser){
                state.currentUser = {...databaseUser, photoURL: photoURL};
            }
            else
            state.currentUser = {...googleUser, photoURL: photoURL};
        },
        signOut: (state, action)=>{
            state.currentUser= null;
        }

    }
});

const {reducer,actions} = userSlice;
export const {setCurrentUser, signOut} = actions;

export default reducer;