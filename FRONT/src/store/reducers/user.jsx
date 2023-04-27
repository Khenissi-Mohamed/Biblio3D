import { createAction, createReducer } from '@reduxjs/toolkit';

export const initialState = {
    user: {},
    // isLoading: false,
    error: undefined,

};

export const setUser = createAction('user/setUser');
// export const setIsLoading = createAction('user/setIsLoading');
export const setError = createAction('user/setError');



const userReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setUser, (state, action) => {
            state.user = action.payload;
        })

        // .addCase(setIsLoading, (state, action) => {
        //     state.isLoading = action.payload;
        // })
        .addCase(setError, (state, action) => {
            state.error = "Une erreur est survenue lors de la récupération des données"
        });
});

export default userReducer;