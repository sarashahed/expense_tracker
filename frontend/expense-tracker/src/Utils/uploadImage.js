import { API_PATHS } from "./apiPath";
import axiosInstance from "./axiosinstance";

const uploadImage = async (imageFile) => {
    const formData = new FormData();
    //Append image file to form data
    formData.append('image', imageFile);

    try {
        const response = await axiosInstance.post(API_PATHS.IMAGE, formData, {
            headers: {
                'Content-Type': 'mulipart/form-data', //Set header for file upload
            }
        });
        return response.data;
    } catch (error) {
        console.error('Error uploading the image:', error);
        throw error;
    }
    };

    export default uploadImage;


