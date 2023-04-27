import { sendNotification } from "../store/reducers/notification.jsx";
import { axiosInstance } from "./axiosInstance.jsx";

export const updateModel = (form, id) => async (dispatch) => {
  try {

    const body = Object.fromEntries(
      Object.entries(form)
        .filter(([_, value]) => value !== null && value !== undefined && value !== '' && !Array.isArray(value))
    );

    body.tag = "{" + body.tag + "}";
    const response = await axiosInstance.patch(
      `/model/${id}`,
      body
      ,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem('token')}`,
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      }
    );
    console.log("modèle modifié");
    dispatch(sendNotification("Votre modèle a bien été modifié !"));


  } catch (error) {
    console.log("une erreur est survenue lors de la modification du modèle");
  }
}
