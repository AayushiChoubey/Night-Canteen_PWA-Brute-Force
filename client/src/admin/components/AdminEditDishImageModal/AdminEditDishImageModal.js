import { Modal, Button } from "react-bootstrap";
import { useState, useRef } from "react";
import { editDishImage } from "../../../repository/dishHandler";

const AdminEditDishImageModal = (props) => {
    const dishImageFileRef = useRef();
    const [selectedDishImage, setSelectedDishImage] = useState(null);
    const handleChangeDishImageFile = (event) => {
        if (event.target.files.length > 0) {
            setSelectedDishImage(event.target.files[0]);
        } else {
            setSelectedDishImage(null);
        }
    }
    const handleClickChooseImageButton = () => {
        if (dishImageFileRef && dishImageFileRef.current) {
            dishImageFileRef.current.click();
        }
    }

    const dishId = props.dishId;
    const handleClickCofirmButton = async () => {
        try {
            await editDishImage(dishId, selectedDishImage);
            alert('Dish image edited successfully!');
            props.onHide();
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
        >
            {/* header */}
            <Modal.Header closeButton>
                <Modal.Title>Edit Dish Image</Modal.Title>
            </Modal.Header>

            {/* body */}
            <Modal.Body>
                <>
                    <input
                        className="d-none" required
                        onChange={(event) => handleChangeDishImageFile(event)} ref={dishImageFileRef}
                        type={'file'} accept={'image/*'}
                    />
                    {/* button to trigger input prompt */}
                    <div className="d-flex justify-content-center">
                        <button
                            onClick={handleClickChooseImageButton}
                            className={'std-button'}
                            style={{
                                color: 'black', backgroundColor: selectedDishImage ? 'lightgreen' : 'transparent',
                                width: '160px',
                                border: '1px solid black',
                            }}
                        >
                            Choose Image
                        </button>
                    </div>
                </>
            </Modal.Body>

            {/* footer */}
            <Modal.Footer>
                <Button variant="secondary" onClick={props.onHide}>
                    Cancel
                </Button>
                <Button
                    variant="primary"
                    onClick={handleClickCofirmButton}
                >
                    Confirm
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AdminEditDishImageModal;