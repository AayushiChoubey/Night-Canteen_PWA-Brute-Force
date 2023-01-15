import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faImage, faTrash } from '@fortawesome/free-solid-svg-icons';
import { deleteDish } from "../../../repository/dishHandler";
import AdminEditDishModal from "../AdminEditDishModal/AdminEditDishModal";
import AdminEditDishImageModal from "../AdminEditDishImageModal/AdminEditDishImageModal";


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

    const [showEditDishModal, setShowEditDishModal] = useState(false);
    const handleHideEditDishModal = () => {
        setShowEditDishModal(false);
    }
    const handleClickEditIcon = () => {
        setShowEditDishModal(true);
    }

    const [showEditDishImageModal, setShowEditDishImageModal] = useState(false);
    const handleHideEditDishImageModal = () => {
        setShowEditDishImageModal(false);
    }
    const handleClickEditImageIcon = () => {
        setShowEditDishImageModal(true);
    }

    return (
        <>
            <div
                className="d-flex border rounded p-2 align-items-center gap-2"
            >
                {dish && dish['dishName']}
                <FontAwesomeIcon
                    icon={faTrash}
                    className="btn btn-primary"
                    onClick={handleClickDeleteIcon}
                />
                <FontAwesomeIcon
                    icon={faEdit}
                    className="btn btn-primary"
                    onClick={handleClickEditIcon}
                />
                <FontAwesomeIcon
                    icon={faImage}
                    className="btn btn-primary"
                    onClick={handleClickEditImageIcon}
                />
            </div>

            {/* edit dish modal */}
            <AdminEditDishModal
                show={showEditDishModal}
                onHide={handleHideEditDishModal}
                dishId={dishId}
            />

            {/* edit dish image modal */}
            <AdminEditDishImageModal
                show={showEditDishImageModal}
                onHide={handleHideEditDishImageModal}
                dishId={dishId}
            />
        </>
    );
}

export default AdminDishCard;