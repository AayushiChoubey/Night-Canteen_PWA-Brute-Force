import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDishCartRedux, reduceDishCartRedux } from "../../../redux/slices/cartSlice";

const PublicDishCard = (props) => {
    const dishId = props.dishId;

    const dishes = useSelector((state) => state.dishes ? state.dishes.value : null);
    const [dish, setDish] = useState(null);

    useEffect(() => {
        const requiredDish = dishes.find((dish) => dish['dishId'] === dishId);
        setDish(requiredDish);
    }, [dishId, dishes]);

    const dispatch = useDispatch();

    const [orderCount, setOrderCount] = useState(0);

    const handleClickMinusIcon = () => {
        if (orderCount > 0) {
            setOrderCount(orderCount - 1);
            dispatch(reduceDishCartRedux(dishId));
        }
    }

    const handleClickPlusIcon = () => {
        setOrderCount(orderCount + 1);
        dispatch(addDishCartRedux(dishId));
    }

    return (
        <div className="d-flex justify-content-between align-items-center mb-3">
            <div className="text-center" style={{fontSize:'12px'}}>
                {/* <img src="/assets/images/vectors/addnew.png" style={{ width: "50px" }} alt="" /> */}
                <img 
                    src={dish && dish['dishImage']} 
                    alt={dish && dish['dishName']} 
                    style={{ width: "75px" }} />
                <br/>
                <i className="fa-solid fa-indian-rupee-sign me-1" />{dish && dish['dishPrice']}
            </div>
            <h6 className="m-0 text-center" style={{ maxWidth: "40%" }}>
                {/* Paneer Bhurji + 2 Paratha with Raita */}
                {dish && dish.dishName}
            </h6>
            
            <p className="m-0">
                <i className="fa-solid fa-minus mx-2 text-danger" onClick={handleClickMinusIcon}/> 
                {orderCount}
                <i className="fa-solid fa-plus mx-2 text-success" onClick={handleClickPlusIcon}/>
            </p>
        </div>
    );
}

export default PublicDishCard;