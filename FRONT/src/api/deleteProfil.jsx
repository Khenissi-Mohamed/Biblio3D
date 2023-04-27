import { saveUser } from "../store/reducers/auth";
import { sendNotification } from "../store/reducers/notification";
import { setUser } from "../store/reducers/user";
import { axiosInstance } from "./axiosInstance";

export const deleteProfile = (navigate) => async (dispatch, getState) => {
    const id = localStorage.getItem('userId');
    console.log('mon id de la req', id);

    const response = axiosInstance.delete(`/user/delete/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    })
    dispatch(saveUser(null));
    dispatch(setUser(null));
    dispatch(sendNotification('Votre compte a bien été supprimé !'))
    localStorage.clear();
    navigate('/');
}