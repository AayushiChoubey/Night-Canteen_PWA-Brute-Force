import { useSelector } from "react-redux";
import HomeDishCard from "../../components/HomeDishCard/HomeDishCard";
import { useNavigate } from 'react-router-dom';
import { Button, Card, Row, Col } from "react-bootstrap";
import { useEffect, useState } from "react";
import PublicOrderCard from "../../components/PublicOrderCard/PublicOrderCard";

const HomePage = () => {

    const user = useSelector((state) => state.user ? state.user.value : null);
    const dishes = useSelector((state) => state.dishes ? state.dishes.value : null);
    const orders = useSelector((state) => state.orders ? state.orders.value : null);

    const [userOrders, setUserOrders] = useState([]);
    useEffect(()=> {
        if (user && orders) {
            const requiredOrders = orders.filter((element)=> element['userId'] === user['userId'])
            setUserOrders(requiredOrders);
        }
    }, [user, orders]);

    const navigator = useNavigate();
    const handleCartClick = () => {
        navigator('/cart');
    }

    const [searchText, setSearchText] = useState('');
    const [filteredDishes, setFilteredDishes] = useState([]);
    useEffect(() => {
        setFilteredDishes(dishes);
    }, [dishes]);
    const handleClickSearchButton = () => {
        let requiredDishes = [];
        if (searchText === '') {
            requiredDishes = dishes;
        } else {
            const filteredDishes = dishes.filter((dish) => {
                return dish['dishName'].toLowerCase().includes(searchText.toLowerCase());
            })
            requiredDishes = filteredDishes;
        }
        setFilteredDishes(requiredDishes);
    }

    return (
        <div>

            {/* Dashboard Section */}
            <Card text='white' className="m-auto my-4 bg-info" style={{
                width: "85%",
                border: "none",
                boxShadow: "0 0 8px 0 rgb(0 0 0 / 15%)",
                backgroundColor: "#FFC107"
            }}>
                <Card.Body>
                    <h2 className="text-center display-5 mt-2 mb-4">Dashboard</h2>
                    <Row>
                        <Col className="text-center" style={{ width: "50%" }}>
                            <h5>Current Order</h5>
                            <h1 className="display-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>091</h1>
                        </Col>
                        <Col className="text-center" style={{ width: "50%" }}>
                            <h5>Your Order</h5>
                            <h1 className="display-1" style={{ fontFamily: "'Orbitron', sans-serif" }}>109</h1>
                        </Col>
                    </Row>
                </Card.Body>
            </Card>

            {/* my order section */}
            {user && userOrders.length > 0 && <div>
                <h1 className="text-center mt-3">
                    Your Orders
                </h1>
                <hr style={{
                    margin: 'auto',
                    width: "50px",
                    border: "3px solid #FFC107"
                }} />

                <div
                    className="d-flex flex-wrap m-auto"
                    style={{width:"85%"}}
                >
                    {orders && orders.map((order) => {
                        if (user && order && order['userId'] === user['userId']) {
                            return (
                                <PublicOrderCard
                                    key={order['orderId']}
                                    orderId={order['orderId']}
                                />
                            )
                        } else {
                            return (
                                <></>
                            )
                        }
                    })
                    }
                </div>
            </div>}

            <input type="text" placeholder="Search" value={searchText}
                onChange={(e) => {
                    setSearchText(e.target.value);
                }}
            />
            <button onClick={handleClickSearchButton}>Search</button>
            {/* menu section */}
            <div>
                <h1
                    className="display-1 text-decoration-underline text-center"
                >
                    Menu
                </h1>

                <div
                    className="d-flex flex-wrap"
                >
                    {filteredDishes && filteredDishes.map((dish) => {
                        return (
                            <HomeDishCard
                                key={dish['dishId']}
                                dishId={dish['dishId']}
                            />
                        )
                    })
                    }
                </div>
            </div>

            <Button
                onClick={handleCartClick}
            >
                Cart
            </Button>
        </div>
    );
}

export default HomePage;