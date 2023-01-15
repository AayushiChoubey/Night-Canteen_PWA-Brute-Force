import { useState } from "react";
import { Container } from "react-bootstrap";
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
                <Container className="text-center my-4" onClick={() => setShowAddDishModal(true)}>
                    <img src="/assets/images/vectors/addnew.png" style={{width:"12rem"}} alt="add food item"/>
                </Container>

                {/* second div for showing dish cards */}
                <div

                >
                    <h1 className="text-center">
                        Current Menu
                    </h1>
                    <hr style={{
                        margin:'auto',
                        width:"150px",
                        border:"2px solid #FFC107"
                    }}/>
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