import { setIsUploaded } from "../store/reducers/cards";
import { sendNotification } from "../store/reducers/notification";
import { axiosInstance } from "./axiosInstance"


const createModel = (form) => async (dispatch) => {

    const { name, description, data, tags, picture, download, category } = form;

    const ObjTag = "{" + tags + "}"
    try {
        console.log("request create model");
        console.log("data", data);
        await axiosInstance.post('/model/add',

            {
                name: name,
                description: description,
                data: data,
                picture: picture,
                tag: ObjTag,
                download: download,
                category_id: category
            },
            {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem('token')}`,
                    'Content-Type': 'multipart/form-data'
                },
            }
        );

        console.log("success");
        dispatch(setIsUploaded(true))
        dispatch(sendNotification('Un instant, votre model va être ajouté !'))



    } catch (error) {

        if (error.response) {
            console.error("response", error.response.status);
            console.error("response", error.response.data);
        } else if (error.request) {
            console.error("request", error.request);
        }
    }
}



export default createModel;
