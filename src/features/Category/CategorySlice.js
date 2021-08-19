const { createSlice } = require("@reduxjs/toolkit");

const CategorySlice = createSlice({
    name: 'category',
    initialState: {category: []},
    reducers:{
        setCategory: (state, action) =>{
            state.category = action.payload;
        }
    }
});

const {reducer,actions} = CategorySlice;
export const {setCategory} = actions;

export default reducer;