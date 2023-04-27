import { createAction, createReducer } from '@reduxjs/toolkit';

export const initialState = {
    result: [],
    image: null,
};

export const setResult = createAction('memberdashboard/setResult');
export const setImage = createAction('memberdashboard/setImage');

const memberdashboardReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setResult, (state, action) => {
            state.result = action.payload;
        })
        .addCase(setImage, (state, action) => {
            state.image = action.payload;
        })
});

export default memberdashboardReducer;
