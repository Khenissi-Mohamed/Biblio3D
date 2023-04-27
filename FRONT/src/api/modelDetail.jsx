import { setModelDetail } from "../store/reducers/modelDetail";
import { axiosInstance } from "./axiosInstance";

export const fetchModeldetail = (id) => async (dispatch, getState) => {


    const response = await axiosInstance.get(`/model/data/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },

    });

        console.log('response.data', response.data)

    dispatch(setModelDetail(response.data));
}
