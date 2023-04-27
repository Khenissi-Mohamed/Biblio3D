import { axiosInstance } from './axiosInstance';

export const fetchResults = (result) => async (dispatch, getState) => {


    try {

        const localPseudo = localStorage.getItem('pseudo');
        const response = await axiosInstance.get(`/model=${result}`);

        for await (const item of response.data) {

            // Logique de conversion de buffer en image
            const pics = new Uint8Array(item.picture.data);
            const blob = new Blob([pics], { type: 'image/png' })
            item.picture = URL.createObjectURL(blob)
        }

        console.log('onfetchquandctrue')
        return await response.data;

    } catch (error) {
        console.error("error in fetchCardByUser", error);
    }
};
