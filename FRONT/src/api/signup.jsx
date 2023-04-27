import { setIsOpenModalLogin, setIsOpenModalSignup } from "../store/reducers/modals";
import { sendNotification } from "../store/reducers/notification";
import { axiosInstance } from "./axiosInstance";

export const signup = (navigate) => async (dispatch, getState) => {
    const state = getState();
    const { email, password, pseudo, firstname, lastname } = state.auth.credentials;

    try {
        const response = await axiosInstance.post('/user/add', {
            email: email,
            password: password,
            pseudo: pseudo,
            firstname: firstname,
            lastname: lastname,
        }, {
            headers: {
                'Content-Type': 'application/multipart/form-data',
            },
        });
        console.log('response', response);
        dispatch(setIsOpenModalSignup(false));
        dispatch(setIsOpenModalLogin(true));
        dispatch((sendNotification('Votre compte a bien été créé !')));
    } catch (error) {
        console.error(error);
    }
}
