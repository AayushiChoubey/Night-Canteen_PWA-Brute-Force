import { useRef, useState } from 'react';
import { Form, Modal, Button } from 'react-bootstrap';
import { addDish } from '../../../repository/dishHandler';

const AdminAddDishModal = (props) => {
    const [dishName, setDishName] = useState('');
    const [dishPrice, setDishPrice] = useState('');

    const dishImageFileRef = useRef();
    const [selectedDishImage, setSelectedDishImage] = useState(null);
    const handleChangeDishImageFile = (event) => {
        if (event.target.files.length > 0) {
            setSelectedDishImage(event.target.files[0]);
        } else {
            setSelectedDishImage(null);
        }
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        if (dishImageFileRef && dishImageFileRef.current) {
            try {
                await addDish(dishName, dishPrice, selectedDishImage);
                alert('Dish added successfully!');
                props.onHide();
            } catch (err) {
                console.log(err);
            }
        }
    }

    return (
        <Modal
            show={props.show}
            onHide={props.onHide}
        >
            <Form
                onSubmit={handleFormSubmit}
            >
                {/* header */}
                <Modal.Header closeButton>
                    <Modal.Title>Add Dish</Modal.Title>
                </Modal.Header>

                {/* body */}
                <Modal.Body>
                    <Form.Group className="mb-3">
                        <Form.Label>Dish Name</Form.Label>
                        <Form.Control
                            type="text" value={dishName}
                            onChange={(event) => setDishName(event.target.value)}
                            required
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Dish Price</Form.Label>
                        <Form.Control
                            type="number" value={dishPrice}
                            onChange={(event) => setDishPrice(event.target.value)}
                            required
                        />
                    </Form.Group>

                    <>
                        <input
                            className="d-none" required
                            onChange={(event) => handleChangeDishImageFile(event)} ref={dishImageFileRef}
                            type={'file'} accept={'image/*'}
                        />
                        {/* button to trigger input prompt */}
                        <div className="d-flex justify-content-center">
                            <button
                                onClick={() => dishImageFileRef.current.click()} className={'std-button'}
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
                    <Button variant="primary" type="submit">
                        Confirm
                    </Button>
                </Modal.Footer>
            </Form>
        </Modal>
    );
}

export default AdminAddDishModal;