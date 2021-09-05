const { createSlice } = require("@reduxjs/toolkit");

const CollectionSlice = createSlice({
    name: 'collection',
    initialState: {collections: [], isLoading: false, userCollection: [], isLoadUserCollection: false},
    reducers:{
        getCollectionProcess: (state, action) =>{
            return {...state, isLoading: true};
        },
        getCollectionSuccess: (state, action) =>{
            return {...state,collections: action.payload, isLoading: false};
        },
        getCollectionFail: (state, action) =>{
            return {...state, isLoading: false};
        },
        getUserCollectionProcess: (state, action) =>{
            return {...state, isLoadUserCollection: true};
        },
        getUserCollectionSuccess: (state, action) =>{
            return {...state,userCollection: action.payload, isLoadUserCollection: false};
        },
        getUserCollectionFail: (state, action) =>{
            return {...state, isLoadUserCollection: false};
        },
        addCollection:(state, action)=>{
            return {...state, collections: [...state.collections, action.payload]};
        }
    }
});

const {reducer,actions} = CollectionSlice;
export const {getCollectionProcess, getCollectionSuccess, getCollectionFail, addCollection,
    getUserCollectionProcess, getUserCollectionSuccess, getUserCollectionFail
} = actions;

export default reducer;