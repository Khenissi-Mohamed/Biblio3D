import { createAction, createReducer } from '@reduxjs/toolkit';

export const initialState = {
    isOpenModalLogin: false,
    isOpenModalSignup: false,
    isOpenModalUpLoad: false,
    isOpenModalEdit: false,
    isOpenModalAlert: false,
    isOpenModalAlertProfile: false,

};

export const setIsOpenModalLogin = createAction('modals/setIsOpenModalLogin');
export const setIsOpenModalSignup = createAction('modals/setIsOpenModalSignup');
export const setIsOpenModalUpLoad = createAction('modals/setIsOpenModalUpLoad');
export const setIsOpenModalEdit = createAction('modals/setIsOpenModalEdit');
export const setIsOpenModalAlert = createAction('modals/setIsOpenModalAlert');
export const setIsOpenModalAlertProfile = createAction('modals/setIsOpenModalAlertProfile');


const modalsReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(setIsOpenModalLogin, (state, action) => {
            state.isOpenModalLogin = action.payload;
            state.isOpenModalSignup = false;
            state.isOpenModalUpLoad = false;
        })
        .addCase(setIsOpenModalSignup, (state, action) => {
            state.isOpenModalSignup = action.payload;
            state.isOpenModalLogin = false;
            state.isOpenModalUpLoad = false;
        })
        .addCase(setIsOpenModalUpLoad, (state, action) => {
            state.isOpenModalUpLoad = action.payload;
            state.isOpenModalLogin = false;
            state.isOpenModalSignup = false;
        })
        .addCase(setIsOpenModalEdit, (state, action) => {
            state.isOpenModalEdit = action.payload;
            state.isOpenModalLogin = false;
            state.isOpenModalSignup = false;
            state.isOpenModalUpLoad = false;
        })
        .addCase(setIsOpenModalAlert, (state, action) => {
            state.isOpenModalAlert = action.payload;
            state.isOpenModalLogin = false;
            state.isOpenModalSignup = false;
            state.isOpenModalUpLoad = false;
            state.isOpenModalEdit = false;
        })
        .addCase(setIsOpenModalAlertProfile, (state, action) => {
            state.isOpenModalAlertProfile = action.payload;
            state.isOpenModalLogin = false;
            state.isOpenModalSignup = false;
            state.isOpenModalUpLoad = false;
            state.isOpenModalEdit = false;
        })
});

export default modalsReducer;