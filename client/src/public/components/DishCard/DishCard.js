import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faImage, faMinus, faPlus, faTrash } from '@fortawesome/free-solid-svg-icons';

const DishCard = (props) => {
    const dishId = props.dishId;
    const dishes = useSelector((state) => state.dishes ? state.dishes.value : null);
    const [dish, setDish] = useState(null);
    useEffect(() => {
        const requiredDish = dishes.find((dish) => dish['dishId'] === dishId);
        setDish(requiredDish);
    })

    const [orderCount, setOrderCount] = useState(0);
    const handleClickMinusIcon = () => {
        if (orderCount > 0) {
            setOrderCount(orderCount - 1);
        }
    }
    const handleClickPlusIcon = () => {
        setOrderCount(orderCount + 1);
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
                <span>{dish && dish['dishPrice']}</span>

                <div
                    className="d-flex gap-2"
                >
                    <FontAwesomeIcon
                        icon={faMinus}
                        className="btn btn-primary"
                        onClick={handleClickMinusIcon}
                    />
                    <span
                    className="p-1 border rounded"
                    >
                        {orderCount}
                    </span>
                    <FontAwesomeIcon
                        icon={faPlus}
                        className="btn btn-primary"
                        onClick={handleClickPlusIcon}
                    />
                </div>
            </div>
        </div>
    );
}

export default DishCard;