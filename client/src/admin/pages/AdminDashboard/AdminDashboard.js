
import { useSelector } from 'react-redux';
import AdminDashboardOrderCard from '../../components/AdminDashboardOrderCard/AdminDashboardOrderCard';

const AdminDashboard = () => {
    const orders = useSelector((state) => state.orders ? state.orders.value : null);

    return (
        <div>
            <h1
                className='display-1 text-center text-decoration-underlined'
            >
                Orders
            </h1>
            {orders && orders.map((order) => {
                return (
                    <AdminDashboardOrderCard
                        key={order['orderId']}
                        orderId={order['orderId']}
                    />
                )
            })}
        </div>
    );
}

export default AdminDashboard;