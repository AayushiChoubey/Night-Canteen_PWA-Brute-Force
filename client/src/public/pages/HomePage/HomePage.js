import { useDispatch, useSelector } from "react-redux";
import { logoutUserRedux } from "../../../redux/slices/userSlice";
import HomeDishCard from "../../components/HomeDishCard/HomeDishCard";
import { useNavigate } from 'react-router-dom';
import { Button } from "react-bootstrap";

const HomePage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user ? state.user.value : null);
    const dishes = useSelector((state) => state.dishes ? state.dishes.value : null);

    const handleSignOutClick = () => {
        dispatch(logoutUserRedux());
    }

    const navigator = useNavigate();
    const handleCartClick = () => {
        navigator('/cart');
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
                    {dishes && dishes.map((dish) => {
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