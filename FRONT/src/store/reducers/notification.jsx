import { createAction, createReducer } from '@reduxjs/toolkit';

export const initialState = {
    open: false,
    message: '',

};

export const sendNotification = createAction('notification/sendNotification');
export const closeNotification = createAction('notification/closeNotification');
export const resetNotificationMessage = createAction('notification/resetNotificationMessage');


const notificationReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(sendNotification, (state, action) => {
            state.open = true;
            state.message = action.payload;
        })
        .addCase(closeNotification, (state) => {
            state.open = false;
        })
        .addCase(resetNotificationMessage, (state) => {
            state.message = '';
        })
});

export default notificationReducer;
