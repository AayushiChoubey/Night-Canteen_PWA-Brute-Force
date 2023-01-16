import axios from "axios";

export const generateJWTToken = (userId, userName, userEmail) => {
    const data = {};
    data['userId'] = userId;
    data['userName'] = userName;
    data['userEmail'] = userEmail;

    return axios.post(`${process.env.REACT_APP_API_URL}/user/generateJWTToken`, data);
}