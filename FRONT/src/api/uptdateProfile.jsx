import axios from "axios";
import { axiosInstance } from "./axiosInstance";
import { changeUptadeProfile, saveUser, setPseudo } from "../store/reducers/auth";
import { setIsOpenModalLogin } from "../store/reducers/modals";
import { useNavigation } from "react-router-dom";
import { setUser } from "../store/reducers/user";
import { sendNotification } from "../store/reducers/notification";

// // import { setPseudo } from '../store/reducers/auth';

// // getState me permettra de récupérer le state global de redux
// // dispatch me permettra d'emettre des actions / intentions

export const uptadeProfile = (id) => async (dispatch, getState) => {
    const state = getState();

    /* const { email, password, firstname, lastname, pseudo, picture } = state.auth.credentials; */

    // Vérification des champs non vides
    // if (!email || !password || !firstname || !lastname || !pseudo || !picture) {
    //     console.log('Tous les champs doivent être remplis');
    //     return;
    // }

    const body = Object.fromEntries(
        Object.entries(state.auth.credentials)
            .filter(([_, value]) => value !== null && value !== undefined && value !== '' && !Array.isArray(value))
    );


    console.log("body", body)

    try {
        const response = await axiosInstance.patch(
            `/user/update/${id}`,
            body, // placer le body ici
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'application/multipart/form-data',
                },
            }
        );

        dispatch(saveUser(response.data))
        dispatch(changeUptadeProfile(response.data))
        dispatch(sendNotification("Votre profil a bien été modifié !"));
    } catch (error) {
        console.log("une erreur est survenue lors de la modification du profil");
    }


}




