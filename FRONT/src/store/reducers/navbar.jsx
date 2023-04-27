import { createAction, createReducer } from '@reduxjs/toolkit';

export const initialState = {
    isScrolling: false,
    isCliked: false,
};

export const setIsScrolling = createAction('navbar/setIsScrolling');
export const setIsCliked = createAction('navbar/setIsCliked');

const navbarReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setIsScrolling, (state, action) => {
            state.isScrolling = action.payload;
        });
    builder
        .addCase(setIsCliked, (state, action) => {
            state.isCliked = action.payload;
        });
});

export default navbarReducer;