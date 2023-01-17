
import { useSelector } from 'react-redux';
import AdminDashboardOrderCard from '../../components/AdminDashboardOrderCard/AdminDashboardOrderCard';
import { Card } from 'react-bootstrap';
import { useEffect, useState } from 'react';

const AdminDashboard = () => {
    const orders = useSelector((state) => state.orders ? state.orders.value : null);

    const [curDate, setCurDate] = useState(new Date());

    // Function that displays the date in the dashboard. Modify to change format of date
    const displayDate = () => {
        return curDate.toString().substring(0, curDate.toString().lastIndexOf(":"));
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCurDate(new Date())
        }, 1000);

        return () => {
            clearInterval(timer);
        }
    });

    return (
        <div>
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
                    <h3 className="mb-0 text-center text-dark">
                        {/* Sunday, 15 Jan 11:43 PM */}
                        {displayDate()}
                    </h3>
                </Card.Header>
                <Card.Body>
                    <h5>Total Orders : {orders ? orders.length : `---`}</h5>
                    {/* ToDo: Change with Logic */}
                    <h5>Orders Delivered : 24</h5>
                    <h5>Orders Pending : 28</h5>
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

            <div className="d-flex flex-wrap m-auto" style={{ width: "85%" }}>

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