import { createAction, createReducer } from "@reduxjs/toolkit";
// import data from "../../data";


export const intitialState = {
    cards: [],
    isLiked: false,
    likeData: null,
    isUploaded: false,
    isLoading: true,
    idCard: null,
    isDeleted: false,
};

export const setCards = createAction('cards/setCards');
export const setLiked = createAction('cards/setLiked');
export const setLikeData = createAction('cards/setLikeData');
export const setIsLoading = createAction('cards/setIsLoading');
export const setIsUploaded = createAction('cards/setIsUploaded');
export const setIdCard = createAction('cards/setIdCard');
export const setIsDeleted = createAction('cards/setIsDeleted');


export const cardsReducer = createReducer(intitialState, (builder) => {
    builder
        .addCase(setCards, (state, action) => {
            state.cards = action.payload;
            state.isLoading = false;
            state.isUploaded = false;
        })
        .addCase(setLiked, (state, action) => {
            state.isLiked = !state.isLiked;
        })
        .addCase(setLikeData, (state, action) => {
            state.likeData = action.payload;
        })
        .addCase(setIsLoading, (state, action) => {
            state.isLoading = action.payload;
        })
        .addCase(setIsUploaded, (state, action) => {
            state.isUploaded = action.payload;
        })
        .addCase(setIdCard, (state, action) => {
            state.idCard = action.payload;
        })
        .addCase(setIsDeleted, (state, action) => {
            state.isDeleted = action.payload;
        })
});
export default cardsReducer;

