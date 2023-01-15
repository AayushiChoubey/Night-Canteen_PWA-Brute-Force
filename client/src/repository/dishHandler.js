import axios from "axios";

const readImageAsBase64 = (image) => {
    return new Promise((resolve) => {
        const reader = new FileReader();
        reader.onloadend = () => {
            resolve(reader.result);
        }
        reader.readAsDataURL(image);
    });
}

export const addDish = async (dishName, dishPrice, dishImage) => {
    const data = {};
    data['dishName'] = dishName;
    data['dishPrice'] = dishPrice;
    data['dishImage'] = await readImageAsBase64(dishImage);

    return axios.post(`${process.env.REACT_APP_API_URL}/dish/add`, data);
}

export const getAllDishes = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/dish/getAll`);
}

export const deleteDish = (dishId) => {
    const data = {};
    data['dishId'] = dishId;

    return axios.post(`${process.env.REACT_APP_API_URL}/dish/delete`, data);
}

export const editDishWithoutImage = (dishId, dishName, dishPrice) => {
    const data = {};
    data['dishId'] = dishId;
    data['dishName'] = dishName;
    data['dishPrice'] = dishPrice;

    return axios.post(`${process.env.REACT_APP_API_URL}/dish/editWithoutImage`, data);
}

export const editDishImage = async (dishId, dishImage) => {
    const data = {};
    data['dishId'] = dishId;
    data['dishImage'] = await readImageAsBase64(dishImage);

    return axios.post(`${process.env.REACT_APP_API_URL}/dish/editImage`, data);
}