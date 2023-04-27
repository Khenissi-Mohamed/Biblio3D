import { setLikeData, setLiked } from "../store/reducers/cards";
import { axiosInstance } from "./axiosInstance";

export const fetchLikes = (id) => async (dispatch) => {


    const { data } = await axiosInstance.post(`/likes/add/${id}`);
    dispatch(setLiked(data));

    dispatch(setLikeData(data))
    console.log("likeData", data);
    // console.log('le response', data.total_likes.count);
}