import axios from "axios";

export const addDish = async (dishName, dishPrice, dishImage) => {
    const data = {};
    data['dishName'] = dishName;
    data['dishPrice'] = dishPrice;

    const readImageAsBase64 = (image) => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                resolve(reader.result);
            }
            reader.readAsDataURL(image);
        });
    }
    
    data['dishImage'] = await readImageAsBase64(dishImage);

    return axios.post(`${process.env.REACT_APP_API_URL}/dish/add`, data);
}
