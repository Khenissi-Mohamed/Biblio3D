import { createAction, createReducer } from '@reduxjs/toolkit';

export const initialState = {
    comments: [],
    description: '',
    format: '',
    name: '',
    like: '',
    pseudo: '',
    size: '',
    tag: [],

};

export const setModelDetail = createAction('modelDetail/setModelDetail');

const modelDetailReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setModelDetail, (state, action) => {

            state.comments = action.payload.comments;
            state.description = action.payload.description;
            state.format = action.payload.format;
            state.name = action.payload.name;
            state.like = action.payload.like;
            state.pseudo = action.payload.pseudo;
            state.size = action.payload.size;
            state.tag = action.payload.tag;
        })
});

export default modelDetailReducer;





