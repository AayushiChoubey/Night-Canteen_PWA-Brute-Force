import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { editDishWithoutImage } from '../../../repository/dishHandler';

const AdminEditDishModal = (props) => {
    const [dishName, setDishName] = useState('');
    const [dishPrice, setDishPrice] = useState('');
    const dishId = props.dishId;
    const dishes = useSelector((state) => state.dishes ? state.dishes.value : null);
    const [dish, setDish] = useState(null);
    useEffect(() => {
        const requiredDish = dishes.find((element) => element['dishId'] === dishId);
        setDish(requiredDish);
        setDishName(requiredDish['dishName']);
        setDishPrice(requiredDish['dishPrice']);
    }, [])

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            await editDishWithoutImage(dishId, dishName, dishPrice);
            alert('Dish edited successfully!');
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
            <Form
                onSubmit={handleFormSubmit}
            >
                {/* header */}
                <Modal.Header closeButton>
                    <Modal.Title>Edit Dish</Modal.Title>
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

export default AdminEditDishModal;