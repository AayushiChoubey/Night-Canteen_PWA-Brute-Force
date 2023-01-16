import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { changeOrderStatus } from '../../../repository/orderHandler';

const AdminDashboardOrderCard = (props) => {
    const orderId = props.orderId;
    const orders = useSelector((state) => state.orders ? state.orders.value : null);
    const [order, setOrder] = useState(null);
    useEffect(() => {
        const requiredOrder = orders.find((order) => order['orderId'] === orderId);
        setOrder(requiredOrder);
    }, [orderId, orders]);

    const handleClickPreparingButton = async () => {
        const response = await changeOrderStatus(orderId, '2');
        console.log(response);
    }

    const handleClickDeliveredButton = async () => {
        const response = await changeOrderStatus(orderId, '3');
        console.log(response);
    }

    return (
        <div>
            <span
            >
                {order && order['orderToken']}
                <Button
                    onClick={handleClickPreparingButton}
                >
                    Preparing
                </Button>
                <Button
                    onClick={handleClickDeliveredButton}
                >
                    Delivered
                </Button>
            </span>
        </div>
    );
}

export default AdminDashboardOrderCard;