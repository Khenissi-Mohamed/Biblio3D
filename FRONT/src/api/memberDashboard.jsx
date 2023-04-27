import { setmemberDashboard } from "../store/reducers/memberDashboard";
import { axiosInstance } from "./axiosInstance";

export const fetchMember = (id) => async (dispatch, getState) => {

    const response = await axiosInstance.get(`/${id}/dashboard`, {
        headers: {
            // Authorization: `Bearer ${localStorage.getItem('token')}`,
            'Content-Type': 'application/x-www-form-urlencoded',
        },
    });
    console.log('une testicule dans le pudding', response);
    dispatch(setmemberDashboard(response.data));
}