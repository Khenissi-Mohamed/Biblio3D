import { saveUser } from "../store/reducers/auth";
import { setUser } from "../store/reducers/user";
import { axiosInstance } from "./axiosInstance";


export const fetchOne = (id) => async (dispatch, getState) => {
    // const idStorage = localStorage.getItem('userId');
    const response = await axiosInstance.get(`/user/getOne/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    console.log("ici");
    console.log('response', response);

    if (response.status === 200) {
        //Logique de conversion du buffer en image
        const pics = await new Uint8Array(response.data.userProfil.picture.data);
        const blob = await new Blob([pics], { type: 'image/png' })
        const url = URL.createObjectURL(blob);


        response.data.userProfil.picture = url


        dispatch(saveUser({ logged: true }));
        dispatch(setUser(response.data.userProfil));


        return response.data.userProfil;

    } else {
        console.log('error');
    }


}

