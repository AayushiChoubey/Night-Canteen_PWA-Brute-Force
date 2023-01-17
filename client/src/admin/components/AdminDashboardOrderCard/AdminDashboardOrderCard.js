import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { Card, Row, Col, Badge } from 'react-bootstrap';
import { changeOrderStatus } from '../../../repository/orderHandler';

const AdminDashboardOrderCard = (props) => {

    const orderId = props.orderId;
    const orders = useSelector((state) => state.orders ? state.orders.value : null);
    const [order, setOrder] = useState(null);
    const dishes = useSelector((state) => state.dishes ? state.dishes.value : null);
    const [orderDate, setOrderDate] = useState(null);
    const status = ['Unpaid', 'Preparing', 'Order Ready', 'Order Delivered'];
    const variant = ['primary', 'primary', 'warning', 'success'];

    useEffect(() => {
        const requiredOrder = orders.find((order) => order['orderId'] === orderId);
        setOrder(requiredOrder);
        setOrderDate(new Date(requiredOrder.orderTime));
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
        <div className='my-4 '>
            <Card className="mx-auto h-100" style={{ width: "20rem", border: "none", boxShadow: "0 0 8px 0 rgb(0 0 0 / 15%)" }}>
                {order && <Badge pill className={`bg-${variant[order.orderStatus]}`} style={{
                    width: '120px',
                    position: 'absolute',
                    top: '-3%',
                    right: '-3%',
                }}>
                    {status[order.orderStatus]}
                </Badge>}

                <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-around' }}>
                    <h4 className="text-danger text-center">Order#{order && order.orderToken}</h4>
                    <Row className='align-items-center'>
                        <Col className='col-8'>
                            <h5>Dish</h5>
                        </Col>
                        <Col className='text-end'>
                            <h5>Quantity</h5>
                        </Col>
                    </Row>
                    {order && order.orderDishes && order.orderDishes.map((dish) => {
                        // console.log(order);
                        const requiredDish = dishes.find((element) => element['dishId'] === dish.dishId)
                        return (
                            <Row key={dish.dishId} className='align-items-center mb-2'>
                                <Col className='col-8'>
                                    <p className="m-0">
                                        {requiredDish && requiredDish.dishName}
                                    </p>
                                </Col>
                                <Col className='text-end'>
                                    <p className="m-0">
                                        {dish.dishCount}
                                    </p>
                                </Col>
                            </Row>
                        )
                    })}

                    {order && <Row className="mb-1 text-center">
                        {/* <Col>
                            <Badge pill className={`h-100 bg-${variant[order.orderStatus]}`} style={{ width: '120px' }}>{status[order.orderStatus]}</Badge>
                        </Col> */}
                        <Col className="text-muted">
                            {/* 16/01/23 17:52 */}
                            {orderDate && `${orderDate.getDate()}/${orderDate.getMonth() + 1}/${orderDate.getFullYear()}  ${orderDate.getHours()}:${orderDate.getMinutes()}`}
                        </Col>
                    </Row>}

                    <Row className="my-1 text-center">

                        {/* TODO disable depending on order status */}
                        <Col>
                            <Button size="sm" variant='primary' onClick={handleClickPreparingButton}>Order Ready</Button>
                        </Col>
                        <Col>
                            <Button size="sm" variant='success' onClick={handleClickDeliveredButton}>Delivered</Button>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>
        </div>
    );
}

export default AdminDashboardOrderCard;