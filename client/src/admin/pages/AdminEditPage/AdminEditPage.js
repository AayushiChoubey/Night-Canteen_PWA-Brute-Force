import { useState } from "react";
import { Button } from "react-bootstrap";
import AdminAddDishModal from "../../components/AdminAddDishModal/AdminAddDishModal";

const AdminEditPage = () => {
    const [showAddDishModal, setShowAddDishModal] = useState(false);
    const handleHideAddDishModal = () => {
        setShowAddDishModal(false);
    }

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