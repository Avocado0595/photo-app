const { createSlice } = require("@reduxjs/toolkit");

const CategorySlice = createSlice({
    name: 'category',
    initialState: {category: [], isLoading: false},
    reducers:{
        getCategoryProcess: (state, action) =>{
            return {...state, isLoading: true};
        },
        getCategorySuccess: (state, action) =>{
            return {...state,category: action.payload, isLoading: false};
        },
        getCategoryFail: (state, action) =>{
            return {...state, isLoading: false};
        },
        addCategory:(state, action)=>{
            return {...state, category: [...state.category, action.payload]};
        }
    }
});

const {reducer,actions} = CategorySlice;
export const {getCategoryProcess, getCategorySuccess, getCategoryFail, addCategory} = actions;

export default reducer;