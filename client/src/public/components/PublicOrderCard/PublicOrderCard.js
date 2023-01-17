import React, { useEffect, useState } from 'react'
import { Card, Col, Row, Badge } from "react-bootstrap"
import { useSelector } from 'react-redux';

function PublicOrderCard(props) {

    const orderId = props.orderId;
    const orders = useSelector((state) => state.orders ? state.orders.value : null);
    const dishes = useSelector((state) => state.dishes ? state.dishes.value : null);
    const [order, setOrder] = useState(null);
    const [orderDate, setOrderDate] = useState(null);
    const status = ['Unpaid', 'Preparing', 'Order Ready', 'Order Delivered'];
    const variant = ['primary', 'primary', 'warning', 'success']

    useEffect(() => {
        const requiredOrder = orders.find((element) => element['orderId'] === orderId);
        setOrder(requiredOrder);
        setOrderDate(new Date(requiredOrder.orderTime));
    }, [orderId]);

    return (
        <Card className="mx-auto mt-4 h-100" style={{ width: "20rem", border: "none", boxShadow: "0 0 8px 0 rgb(0 0 0 / 15%)" }}>
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

                {order && <Row className="my-2">
                    <Col>
                        <Badge pill className={`h-100 bg-${variant[order.orderStatus]}`} style={{ width: '120px' }}>{status[order.orderStatus]}</Badge>
                    </Col>
                    <Col className="text-end text-muted">
                        {/* 16/01/23 17:52 */}
                        {orderDate && `${orderDate.getDate()}/${orderDate.getMonth() + 1}/${orderDate.getFullYear()}  ${orderDate.getHours()}:${orderDate.getMinutes()}`}
                    </Col>
                </Row>}
            </Card.Body>
        </Card>
    )
}

export default PublicOrderCard  