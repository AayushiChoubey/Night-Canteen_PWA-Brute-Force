import { useEffect, useState } from 'react';
import { Modal, Form, Button } from 'react-bootstrap';
import { useSelector } from 'react-redux';
import { editDishWithoutImage } from '../../../repository/dishHandler';

const AdminEditDishModal = (props) => {
    const user = useSelector((state) => state.user ? state.user.value : null);

    const [dishName, setDishName] = useState('');
    const [dishPrice, setDishPrice] = useState('');
    const [dishIsNonVeg, setDishIsNonVeg] = useState(false);
    const [dishIsAvailable, setDishIsAvailable] = useState(true);
    const dishId = props.dishId;
    const dishes = useSelector((state) => state.dishes ? state.dishes.value : null);
    const [dish, setDish] = useState(null);
    useEffect(() => {
        const requiredDish = dishes.find((element) => element['dishId'] === dishId);
        setDish(requiredDish);
        setDishName(requiredDish['dishName']);
        setDishPrice(requiredDish['dishPrice']);
        setDishIsNonVeg(requiredDish['dishIsNonVeg']);
        setDishIsAvailable(requiredDish['dishIsAvailable']);
    }, [])

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        try {
            console.log(dishIsNonVeg, dishIsAvailable);
            await editDishWithoutImage(dishId, dishName, dishPrice, dishIsNonVeg, dishIsAvailable, user['token']);
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
                    {/* TODO: Load checkbox checked or not into checked attribute */}
                    <Form.Group className="d-flex justify-content-between mb-3">
                        <Form.Check
                            type='switch'
                            id='dishIsNonVeg'
                            label={dishIsNonVeg ? 'Non-Veg' : "Veg"}
                            style={{ color: dishIsNonVeg ? 'red' : 'green' }}
                            checked={dishIsNonVeg}
                            onChange={(event) => setDishIsNonVeg(event.target.checked)}
                        />

                        <Form.Check
                            type='switch'
                            id='dishIsAvailable'
                            label='Is Dish Available?'
                            checked={dishIsAvailable}
                            onChange={(event) => setDishIsAvailable(event.target.checked)}
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