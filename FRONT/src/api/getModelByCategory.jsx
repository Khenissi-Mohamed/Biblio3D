import { axiosInstance } from './axiosInstance';
import {setCards} from "../store/reducers/cards.jsx";

export const fetchByCategory = (categoryName) => async (dispatch) => {


  try {

    console.log("request by category started")

    const response = await axiosInstance.get(`/model?category=${categoryName}`);


    if (response.data === "no content") {
      console.log("No model found");
      dispatch(setCards([]));
      return;
    }

    for await (const item of response.data) {

      // Logique de conversion de buffer en image
      const pics = new Uint8Array(item.picture.data);
      const blob = new Blob([pics], { type: 'image/png' })
      item.picture = URL.createObjectURL(blob)
    }


    dispatch(setCards([]));
    dispatch(setCards(response.data));


  } catch (error) {

    console.error("error in fetchCardByCategory", error);
  }
};
