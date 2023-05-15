import { setCards } from '../store/reducers/cards';
import { axiosInstance } from './axiosInstance';

export const fetchCards = () => async (dispatch) => {
    console.log("ici");
    try {
        const response = await axiosInstance.get('/model');
        // const data = response.data;


        for (const item of response.data) {

            // Logique de conversion de buffer en image
            const pics = new Uint8Array(item.picture.data);
            const blob = new Blob([pics], { type: 'image/png' })
            const url = URL.createObjectURL(blob);

            item.picture = url
        }
        console.log('et la');
        console.log("fetchcards", response.data);
        dispatch(setCards(response.data));

    } catch (error) {
        console.log("et l");
        console.error(error);
    }
};