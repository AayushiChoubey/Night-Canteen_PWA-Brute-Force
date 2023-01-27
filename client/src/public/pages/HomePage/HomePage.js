import { useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { Button, Card } from "react-bootstrap";
import { useCallback, useEffect, useState } from "react";
import PublicOrderCard from "../../components/PublicOrderCard/PublicOrderCard";
import PublicDishCard from "../../components/PublicDishCard/PublicDishCard";
import BottomNav from "../../components/BottomNav/BottomNav";

const HomePage = () => {

    const user = useSelector((state) => state.user ? state.user.value : null);
    const dishes = useSelector((state) => state.dishes ? state.dishes.value : null);
    const orders = useSelector((state) => state.orders ? state.orders.value : null);

    const [userOrders, setUserOrders] = useState([]);
    useEffect(() => {
        if (user && orders) {
            const requiredOrders = orders.filter((element) => element['userId'] === user['userId'])
            setUserOrders(requiredOrders);
        }
    }, [user, orders]);

    const navigator = useNavigate();
    const handleCartClick = () => {
        navigator('/cart');
    }

    const [searchText, setSearchText] = useState('');
    const [filteredDishes, setFilteredDishes] = useState([]);

    const getFilteredDishes = useCallback(() => {
        let requiredDishes = [];
        if (searchText === '') {
            requiredDishes = dishes;
        } else {
            const filteredDishes = dishes.filter((dish) => {
                return dish['dishName'].toLowerCase().includes(searchText.toLowerCase());
            })
            requiredDishes = filteredDishes;
        }

        requiredDishes = requiredDishes.filter((dish) => {
            return dish['dishIsAvailable'];
        });
        return requiredDishes;
    }, [dishes, searchText])

    useEffect(() => {
        setFilteredDishes(getFilteredDishes());
    }, [dishes, getFilteredDishes]);

    const handleClickSearchButton = () => {
        setFilteredDishes(getFilteredDishes());
    }

    return (
        <div>
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
                    className="d-flex flex-wrap m-auto justify-content-around"
                    style={{ width: "85%" }}
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

            {/* menu section */}
            <div>
                <h1 className="text-center mt-3">
                    Menu
                </h1>
                <hr style={{
                    margin: 'auto',
                    width: "50px",
                    border: "3px solid #FFC107"
                }} />

                {/* Search in Menu */}

                <div className="input-group my-3 m-auto" style={{ width: '85%', borderRadius: '50px', border: '2px solid rgba(255, 193, 7, 0.5)' }}>
                    <input
                        type="text"
                        className="form-control"
                        placeholder="Search Dish Item"
                        style={{ border: 'none', borderRadius: "50px" }}
                        value={searchText}
                        onChange={(e) => {
                            setSearchText(e.target.value);
                        }}
                    >
                    </input>
                    <Button variant="warning" style={{ borderRadius: '50px', width: "60px", margin: '4px 6px 4px 0px' }} onClick={handleClickSearchButton}><i className="fa-solid fa-magnifying-glass"></i></Button>
                </div>

                {/* Menu items */}
                <Card className="mx-auto mt-4" style={{ width: "85%", border: "none", boxShadow: "0 0 8px 0 rgb(0 0 0 / 15%)", marginBottom: "100px" }}>
                    <Card.Body>
                        {filteredDishes && filteredDishes.map((dish) =>
                            <PublicDishCard
                                key={dish['dishId']}
                                dishId={dish['dishId']}
                            />
                        )}
                    </Card.Body>
                </Card>
            </div>

            <BottomNav type="home" func={handleCartClick} />
        </div>
    );
}

export default HomePage;