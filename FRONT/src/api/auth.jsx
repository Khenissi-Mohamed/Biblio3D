import axios from "axios";
import { axiosInstance } from "./axiosInstance";
import { clearLoginError, loginError, logout, saveUser, setPseudo } from "../store/reducers/auth";
import { setIsOpenModalLogin } from "../store/reducers/modals";
import { useNavigation } from "react-router-dom";
import { closeNotification, sendNotification } from "../store/reducers/notification";

// // import { setPseudo } from '../store/reducers/auth';

// // getState me permettra de récupérer le state global de redux
// // dispatch me permettra d'emettre des actions / intentions

export const login = (navigate) => async (dispatch, getState) => {
    const state = getState();
    const { email, password } = state.auth.credentials;

    try {
        const response = await axiosInstance.post('/user/signin', {
            email: email,
            password: password,
        }, {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded',
            },
        });

        axiosInstance.defaults.headers.common[
            'Authorization'
        ] = `Bearer ${response.data.token}`;

        localStorage.setItem('token', response.data.token);
        localStorage.setItem('userId', response.data.userId);
        localStorage.setItem('pseudo', response.data.pseudo);

        dispatch(saveUser(response.data));
        dispatch(setPseudo(response.data.pseudo));
        dispatch(setIsOpenModalLogin(false));
        // send notification
        dispatch((sendNotification('Vous êtes connecté !')));


        setTimeout(() => {
            dispatch(logout());
            localStorage.clear();
        }, 60 * 60 * 1000); // 1 heure en millisecondes* 1000);
    } catch (error) {

        console.log('error', error.response.data);
        dispatch(loginError(error.response.data));
        setTimeout(() => {
            dispatch(clearLoginError())
        }, 5000);
    }
};

// added a 1h timeout to the logout function and clear local storage



