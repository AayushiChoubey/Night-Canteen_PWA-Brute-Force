import { useState } from "react";
import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import AdminAddDishModal from "../../components/AdminAddDishModal/AdminAddDishModal";
import AdminDishCard from "../../components/AdminDishCard/AdminDishCard";

const AdminEditPage = () => {
    const [showAddDishModal, setShowAddDishModal] = useState(false);
    const handleHideAddDishModal = () => {
        setShowAddDishModal(false);
    }

    const dishes = useSelector((state) => state.dishes ? state.dishes.value : null);

    return (
        <>
            <div>
                {/* first div for buttons */}
                <div
                    className="d-flex justify-content-end"
                >
                    <Button
                        onClick={() => setShowAddDishModal(true)}
                    >
                        Add dish
                    </Button>
                </div>

                {/* second div for showing dish cards */}
                <div

                >
                    <h1
                        className="display-1 text-decoration-underline text-center"
                    >
                        Dishes
                    </h1>

                    <div
                        className="d-flex flex-wrap"
                    >
                        {dishes && dishes.map((dish) =>
                            <AdminDishCard
                                key={dish['dishId']}
                                dishId={dish['dishId']}
                            />
                        )}
                    </div>
                </div>
            </div>

            {/* add dish modal */}
            <AdminAddDishModal
                show={showAddDishModal}
                onHide={handleHideAddDishModal}
            />
        </>
    );
}

export default AdminEditPage;