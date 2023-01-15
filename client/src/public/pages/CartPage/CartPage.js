import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import CartDishCard from "../../components/CartDishCard/CartDishCard";

const CartPage = () => {
    const cart = useSelector((state) => state.cart ? state.cart.value : null);

    return (
        <div>
            <h1
                className="display-1 text-decoration-underline text-center"
            >
                Your order
            </h1>

            {/* container for dishes in cart */}
            <div
                className="d-flex flex-wrap"
            >
                {cart && cart.map((dish) => {
                    return (
                        <CartDishCard
                            key={dish['dishId']}
                            dishId={dish['dishId']}
                            dishCount={dish['dishCount']}
                        />
                    )
                })}
            </div>
        </div>
    );
}

export default CartPage;