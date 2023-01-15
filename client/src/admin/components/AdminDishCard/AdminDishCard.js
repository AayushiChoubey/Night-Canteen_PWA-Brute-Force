import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteDish } from "../../../repository/dishHandler";


const AdminDishCard = (props) => {
    const dishId = props.dishId;
    const dishes = useSelector((state) => state.dishes ? state.dishes.value : null);
    const [dish, setDish] = useState(null);
    useEffect(() => {
        const requiredDish = dishes.find((element) => element['dishId'] === dishId);
        setDish(requiredDish);
    }, [dishId]);

    const handleClickDeleteIcon = () => {
        const response = window.confirm('Do you really want to delete this dish?');
        if (response) {
            deleteDish(dishId);
        }
    }

    return (
        <div
            className="d-flex border rounded p-2 align-items-center"
        >
            {dish && dish['dishName']}
            <FontAwesomeIcon
                icon={faTrash}
                className="btn btn-primary"
                onClick={handleClickDeleteIcon}
            />
        </div>
    );
}

export default AdminDishCard;