import { Button, Container, Card } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { clearCartRedux } from "../../../redux/slices/cartSlice";
import { createPaymentOrder, verifyPaymentOrder } from "../../../repository/orderHandler";
import CartDishCard from "../../components/CartDishCard/CartDishCard";

const CartPage = () => {
    const user = useSelector((state) => state.user ? state.user.value : null);
    const cart = useSelector((state) => state.cart ? state.cart.value : null);

    const dispatch = useDispatch();

    const initPayment = (orderData, paymentKey) => {
        const options = {
            key: paymentKey,
            amount: orderData.amount,
            currency: orderData.currency,
            name: "Food Order",
            description: "This amount has been paid to buy food from Night Canteen of IIT Indore",
            image: "https://picsum.photos/200/300",
            order_id: orderData.id,
            handler: async (response) => {
                try {
                    await verifyPaymentOrder(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
                    dispatch(clearCartRedux());
                } catch (err) {
                    console.log(err);
                }
            }
        };

        // open razorpay window in frontend
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    const handleClickPayButton = () => {
        try {
            createPaymentOrder(cart, user['userId']).then(async (response) => {
                initPayment(response.data.order, response.data.paymentKey);
            }).catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1 className="text-center mt-3">
                Confirm Order
            </h1>
            <hr style={{
                margin: 'auto',
                width: "100px",
                border: "3px solid #FFC107"
            }} />

            {/* container for dishes in cart */}
            <Card className="m-auto mt-4" style={{ width: "85%", border: "none", boxShadow: "0 0 8px 0 rgb(0 0 0 / 15%)" }}>
                <Card.Body>
                    {cart && cart.length > 0 ?
                        cart.map((dish) => {
                            return (
                                <CartDishCard
                                    key={dish['dishId']}
                                    dishId={dish['dishId']}
                                    dishCount={dish['dishCount']}
                                />
                            )
                        })
                        :
                        <Container className="text-center">
                            <h3 className="display-4">Your Cart is Empty!</h3>
                            <Link className="text-italic" to='/' style={{ textDecoration: 'none', color: '#FFC107' }}>Add Dishes to Proceed Further</Link>
                        </Container>
                    }
                </Card.Body>
            </Card>

            {/* payment button */}
            <Container className="d-flex justify-content-between my-4">
                <Button variant="secondary">
                    <Link to='/' style={{ textDecoration: 'none', color: 'white' }}>Add More Dishes</Link>
                </Button>
                <Button
                    onClick={handleClickPayButton}
                    variant='warning'
                >
                    Pay to Order
                </Button>
            </Container>
        </div>
    );
}

export default CartPage;