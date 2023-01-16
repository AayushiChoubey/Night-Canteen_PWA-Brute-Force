import { useDispatch, useSelector } from "react-redux";
import { logoutUserRedux } from "../../../redux/slices/userSlice";
import HomeDishCard from "../../components/HomeDishCard/HomeDishCard";
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";
import { useEffect, useState } from "react";

const HomePage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user ? state.user.value : null);
    const dishes = useSelector((state) => state.dishes ? state.dishes.value : null);
    const orders = useSelector((state) => state.orders ? state.orders.value : null);

    const handleSignOutClick = () => {
        dispatch(logoutUserRedux());
    }

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
            {/* navbar */}
            <div
                className="d-flex justify-content-end"
            >
                {user ?
                    <>
                        <button onClick={handleSignOutClick}>Sign Out</button>
                    </>
                    :
                    <>
                        <div id='googleSignInDiv'></div>
                    </>
                }
            </div>

            {/* my order section */}
            <div>
                <h1
                    className="display-1 text-decoration-underline text-center"
                >
                    My Order
                </h1>

                <div
                    className="d-flex flex-wrap"
                >
                    {orders && orders.map((order) => {
                        if (user && order && order['userId'] === user['userId']) {
                            return (
                                <HomeDishCard
                                    key={order['orderId']}
                                    dishId={order['orderId']}
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
            </div>

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