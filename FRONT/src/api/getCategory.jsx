import { setCategories } from '../store/reducers/category';
import { axiosInstance } from './axiosInstance';



export const fetchCategories = () => async (dispatch) => {
    console.log('category')
    try {

        const response = await axiosInstance.get(`/category`);
        dispatch(setCategories(response.data));

    } catch (error) {
        console.error("error while fetching categories", error);
    }
};
