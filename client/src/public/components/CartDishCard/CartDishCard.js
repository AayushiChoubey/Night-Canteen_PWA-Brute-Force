import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { removeDishCartRedux } from "../../../redux/slices/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartDishCard = (props) => {
    const dishId = props.dishId;
    const dishes = useSelector((state) => state.dishes ? state.dishes.value : null);
    const [dish, setDish] = useState(null);
    useEffect(() => {
        const requiredDish = dishes.find((dish) => dish['dishId'] === dishId);
        setDish(requiredDish);
    }, [dishId, dishes]);

    const dispatch = useDispatch();

    const handleClickDeleteIcon = () => {
        dispatch(removeDishCartRedux(dishId));
    }

    return (
        <div
            className="d-flex flex-column justify-content-center align-items-center gap-2 border p-2 rounded"
            style={{
                width: '250px',
                height: '250px',
            }}
        >
            {dish &&
                <img
                    src={dish['dishImage']}
                    alt={dish['dishName']}
                    style={{
                        maxWidth: '150px',
                        maxHeight: '150px',
                    }}
                />
            }

            <div
                className="d-flex justify-content-between gap-5"
            >
                <div
                    className="d-flex gap-2"
                >
                    <FontAwesomeIcon
                        icon={faTrash}
                        className="btn btn-primary"
                        onClick={handleClickDeleteIcon}
                    />
                </div>
            </div>
        </div>
    );
}

export default CartDishCard;