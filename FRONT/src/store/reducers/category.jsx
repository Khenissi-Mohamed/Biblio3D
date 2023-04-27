import { createAction, createReducer } from '@reduxjs/toolkit';

export const initialState = {
    categories: [],
    isLoading: true,

};

export const setCategories = createAction('category/setCategories');
export const setIsLoading = createAction('category/setIsLoading');



const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setCategories, (state, action) => {
            state.categories = action.payload;
            state.isLoading = false;
        })
        .addCase(setIsLoading, (state, action) => {
            state.isLoading = action.payload;
        })

});


export default userReducer;
