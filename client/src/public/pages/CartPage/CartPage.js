import { Button } from "react-bootstrap";
import { useSelector } from "react-redux";
import { createPaymentOrder, verifyPaymentOrder } from "../../../repository/orderHandler";
import CartDishCard from "../../components/CartDishCard/CartDishCard";

const CartPage = () => {
    const cart = useSelector((state) => state.cart ? state.cart.value : null);

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
                    const verificationResponse = await verifyPaymentOrder(response.razorpay_payment_id, response.razorpay_order_id, response.razorpay_signature);
                    console.log(verificationResponse);
                } catch (err) {
                    console.log(err);
                }
            }
        };

        // open razorpay window in frontend
        const paymentObject = new window.Razorpay(options);
        paymentObject.open();
    }

    const handleClickPayButton = async () => {
        try {
            createPaymentOrder(cart).then((response) => {
                initPayment(response.data.order, response.data.paymentKey);
            }).catch((err) => console.log(err));
        } catch (err) {
            console.log(err);
        }
    }

    return (
        <div>
            <h1
                className="display-1 text-decoration-underline text-center"
            >
                Your order
            </h1>

            {/* container for dishes in cart */}
            <div
                className="d-flex flex-wrap"
            >
                {cart && cart.map((dish) => {
                    return (
                        <CartDishCard
                            key={dish['dishId']}
                            dishId={dish['dishId']}
                            dishCount={dish['dishCount']}
                        />
                    )
                })}
            </div>

            {/* payment button */}
            <Button
                onClick={handleClickPayButton}
            >
                Pay
            </Button>
        </div>
    );
}

export default CartPage;