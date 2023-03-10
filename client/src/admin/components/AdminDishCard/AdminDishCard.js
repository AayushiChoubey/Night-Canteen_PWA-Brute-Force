import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { deleteDish } from "../../../repository/dishHandler";
import AdminEditDishModal from "../AdminEditDishModal/AdminEditDishModal";
import AdminEditDishImageModal from "../AdminEditDishImageModal/AdminEditDishImageModal";

const AdminDishCard = (props) => {
    const user = useSelector((state) => state.user ? state.user.value : null);

    const dishId = props.dishId;
    const dishes = useSelector((state) => state.dishes ? state.dishes.value : null);
    const [dish, setDish] = useState(null);
    useEffect(() => {
        if (dishes && dishId) {
            const requiredDish = dishes.find((element) => element['dishId'] === dishId);
            setDish(requiredDish);
        }
    }, [dishId, dishes]);

    const handleClickDeleteIcon = async () => {
        const response = window.confirm('Do you really want to delete this dish?');
        if (response) {
            await deleteDish(dishId, user['token']);
            alert('Dish deleted successfully!');
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
            <div className="d-flex justify-content-between align-items-center mb-3">
                
                <div className="d-flex align-items-center">
                    <i className={`fa-regular fa-circle-stop ${dish && dish['dishIsNonVeg'] ? 'text-danger' : 'text-success'} me-1`}></i>
                    <div className="text-center" style={{ fontSize: '12px' }}>
                        <img
                            // ToDo: write logic to show dish image if available else show default image
                            // src="/assets/images/vectors/fooditem.png"
                            src={dish && dish['dishImage']}
                            alt={dish && dish['dishName']}
                            style={{ width: "75px" }}
                        />
                        <br />
                        <i className="fa-solid fa-indian-rupee-sign me-1" />{dish && dish['dishPrice']}
                    </div>
                </div>
                <h6 className="m-0 text-center" style={{ flexGrow: '1', maxWidth: "40%" }}>
                    {/* Paneer Bhurji + 2 Paratha with Raita */}
                    {dish && dish.dishName}
                </h6>
                <div>
                    <div className="d-flex justify-content-around align-items-center my-2">
                        <i className="fa-solid fa-edit text-dark me-1" onClick={handleClickEditIcon} />
                        <i className="fa-solid text-primary fa-image" onClick={handleClickEditImageIcon} />
                        <i className="fa-solid text-danger fa-trash " onClick={handleClickDeleteIcon} />
                    </div>
                    <p className="text-muted m-0">{dish && dish['dishIsAvailable'] ? 'Available' : 'Unavailable'}</p>
                </div>
            </div>
            <hr/>

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