import axios from "axios";

export const createPaymentOrder = async (orderedDishes) => {
    const data = {};
    data['orderedDishes'] = orderedDishes;

    return axios.post(`${process.env.REACT_APP_API_URL}/order/createPaymentOrder`, data);
}

export const verifyPaymentOrder = async (razorpay_payment_id, razorpay_order_id, razorpay_signature) => {
    return axios.post(`${process.env.REACT_APP_API_URL}/order/verifySubscriptionPayment`, {
        razorpay_payment_id: razorpay_payment_id,
        razorpay_order_id: razorpay_order_id,
        razorpay_signature: razorpay_signature,
    })
}

export const getAllOrders = () => {
    return axios.get(`${process.env.REACT_APP_API_URL}/order/getAll`);
}