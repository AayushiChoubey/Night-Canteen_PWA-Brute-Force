import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';

const useOrder = (orderId) => {

    const [order, setOrder] = useState(null);
    const orders = useSelector((state) => state.orders ? state.orders.value : null);
    useEffect(() => {
        if (orders) {
            const requiredOrder = orders.find((order) => order['orderId'] === orderId);
            setOrder(requiredOrder);
        }
    }, [orderId, orders]);

    return order;
}

export default useOrder;