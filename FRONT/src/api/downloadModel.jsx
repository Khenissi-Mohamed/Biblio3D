import axios from "axios";


export const downloadModel = async (id) => {


  try {
    const response = await axios.get(`https://biblio-production-5483.up.railway.app/api/model/glb/${id}`, {
      responseType: 'arraybuffer'
    });

    const data = await response.data;
    const url = URL.createObjectURL(new Blob([data]));
    response.data.url = url;

    return response.data.url;

  } catch (error) {
    console.error(error);
  }
}
