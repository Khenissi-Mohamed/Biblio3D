import { createAction, createReducer } from '@reduxjs/toolkit';

export const initialState = {
    inputsValues: {
        name: '',
        description: '',
        tag: '',
    },

};

export const changeInputsValues = createAction('editCard/changeInputsValues');


const editCardReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeInputsValues, (state, action) => {
            const { name, value } = action.payload;
            state.inputsValues[name] = value;
        })

});

export default editCardReducer;
