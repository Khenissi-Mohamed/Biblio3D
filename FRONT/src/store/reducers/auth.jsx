import { createAction, createReducer } from '@reduxjs/toolkit';

export const initialState = {
    credentials: {
        email: '',
        password: '',
        changePassword: '',
        lastname: '',
        firstname: '',
        pseudo: '',
        picture: null,
    },
    logged: !!localStorage.getItem('token'),
    token: null,
    loginError: null,
    clearLoginError: null,

};

export const changeCredentialsValue = createAction('auth/changeCredentialsValue');
export const setPseudo = createAction('auth/setPseudo');
export const saveUser = createAction('auth/saveUser');
export const logout = createAction('auth/logout');
export const changeUptadeProfile = createAction('auth/uptadeProfile');
export const loginError = createAction('auth/loginError');
export const clearLoginError = createAction('auth/clearLoginError');


const authReducer = createReducer(initialState, (builder) => {
    builder
        .addCase(changeCredentialsValue, (state, action) => {
            const { name, value } = action.payload;
            state.credentials[name] = value;
        })
        .addCase(saveUser, (state, action) => {
            const { logged, token, pseudo, email, password, changePassword, firstname, lastname, picture } = action.payload;
            state.logged = true;
            state.token = token;
            state.pseudo = pseudo;
            state.credentials.email = email;
            state.credentials.password = password;
            state.credentials.changePassword = changePassword;
            state.credentials.lastname = lastname;
            state.credentials.firstname = firstname;
            state.credentials.picture = picture;
        })
        .addCase(setPseudo, (state, action) => {
            const { pseudo } = action.payload;
            state.credentials.pseudo = pseudo;
        })
        .addCase(changeUptadeProfile, (state, action) => {
            const { name, value, type, } = action.payload;
            if (type === "file") {
                state.credentials[name] = action.payload.files[0];
            } else {
                state.credentials[name] = value;
            }
        })
        .addCase(logout, (state, action) => {
            state.pseudo = "";
            state.credentials.email = "";
            state.credentials.password = "";
            state.credentials.changePassword = "";
            state.credentials.lastname = "";
            state.credentials.firstname = "";
            state.credentials.picture = null;
            state.token = null;
            state.logged = false;
            localStorage.clear();
        })
        .addCase(loginError, (state, action) => {
            state.loginError = action.payload;
        })
        .addCase(clearLoginError, (state) => {
            state.loginError = null;
        })
});

export default authReducer;

