
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import AdminDashboardOrderCard from '../../components/AdminDashboardOrderCard/AdminDashboardOrderCard';
import { Card } from 'react-bootstrap';

const AdminDashboard = () => {
    const orders = useSelector((state) => state.orders ? state.orders.value : null);
    const [dateAndTime, setDateAndTime] = useState('');
    const getLiveDateAndTime = () => {
        const date = new Date();
        return date.toLocaleString('en-IN');
    }
    useEffect(() => {
        const intervalId = setInterval(() => {
            setDateAndTime(getLiveDateAndTime());
        }, 1000);

        return () => {
            clearInterval(intervalId);
        }
    }, [])

    const [countDeliveredOrders, setCountDeliveredOrders] = useState(0);
    const [countPendingOrders, setCountPendingOrders] = useState(0);
    useEffect(() => {
        if (orders) {
            let countDelivered = 0;
            let countPending = 0;
            orders.forEach((order) => {
                if (order['orderStatus'] === '3') {
                    countDelivered++;
                } else {
                    countPending++;
                }
            })
            setCountDeliveredOrders(countDelivered);
            setCountPendingOrders(countPending);
        }
    }, [orders])

    return (
        <div className='mb-5'>
            {/* Dashboard section */}
            <h3 className="text-center mt-3">
                Admin Dashboard
            </h3>
            <hr style={{
                margin: 'auto',
                width: "150px",
                border: "2px solid #FFC107"
            }} />
            <Card text='white' className="m-auto my-4" style={{
                width: "85%",
                border: "none",
                boxShadow: "0 0 8px 0 rgb(0 0 0 / 15%)",
                backgroundColor: "#FFC107"
            }}>
                <Card.Header>
                    {/* show live date and time in indian format */}
                    <h3 className="mb-0 text-center text-dark">{dateAndTime}</h3>
                </Card.Header>
                <Card.Body>
                    <h5>Total Orders : {orders ? orders.length : `---`}</h5>
                    {/* ToDo: Change with Logic */}
                    <h5>Orders Delivered : {countDeliveredOrders}</h5>
                    <h5>Orders Pending : {countPendingOrders}</h5>
                </Card.Body>
            </Card>

            {/* List All Orders */}
            <h3 className="text-center">
                Orders
            </h3>
            <hr style={{
                margin: 'auto',
                width: "40px",
                border: "2px solid #FFC107"
            }} />

            <div className="d-flex flex-wrap m-auto justify-content-around" style={{ width: "85%" }}>

                {orders && orders.map((order) => {
                    return (
                        <AdminDashboardOrderCard
                            key={order['orderId']}
                            orderId={order['orderId']}
                        />
                    )
                })}

                {!orders && <h6 className="text-center mt-4">Hurray! All Orders Delivered.</h6>}

            </div>

            {/* ToDo: Add Section to Show All Delivered Orders Separately */}

        </div>
    );
}

export default AdminDashboard;