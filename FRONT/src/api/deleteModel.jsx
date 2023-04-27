import { setIsDeleted } from "../store/reducers/cards";
import { sendNotification } from "../store/reducers/notification";
import { axiosInstance } from "./axiosInstance"


export const deleteCard = (cardId) => async (dispatch, getstate) => {
    const { isDeleted } = getstate().cards;
    console.log("delete card de apiiiiiiii", cardId);
    try {
        const response = await axiosInstance.delete(`/model/${cardId}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}`,
                'Content-Type': 'application/x-www-form-urlencoded',
            },

        });
        console.log("delete ok");
        dispatch(setIsDeleted(!isDeleted));
        console.log("delete card de apiiiiiiii2", cardId);
        dispatch(sendNotification('Votre model a bien été supprimée !'))


    } catch (error) {
        console.error(error);
    }
};