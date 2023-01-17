import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addDishCartRedux, reduceDishCartRedux, removeDishCartRedux } from "../../../redux/slices/cartSlice";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const CartDishCard = (props) => {
    const dishId = props.dishId;
    const dishes = useSelector((state) => state.dishes ? state.dishes.value : null);
    const [dish, setDish] = useState(null);
    useEffect(() => {
        const requiredDish = dishes.find((dish) => dish['dishId'] === dishId);
        setDish(requiredDish);
    }, [dishId, dishes]);

    const dispatch = useDispatch();

    const [orderCount, setOrderCount] = useState(props.dishCount);

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

    const handleClickDeleteIcon = () => {
        dispatch(removeDishCartRedux(dishId));
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
            
            <p className="m-0 text-center">
                <div className="mb-1">
                <i className="fa-solid fa-minus mx-2 text-danger" onClick={handleClickMinusIcon}/> 
                {orderCount}
                <i className="fa-solid fa-plus mx-2 text-success" onClick={handleClickPlusIcon}/>
                </div>
                <i className="fa-solid fa-trash mx-2 text-dark" onClick={handleClickDeleteIcon}/>
            </p>
        </div>
        // <div
        //     className="d-flex flex-column justify-content-center align-items-center gap-2 border p-2 rounded"
        //     style={{
        //         width: '250px',
        //         height: '250px',
        //     }}
        // >
        //     {dish &&
        //         <img
        //             src={dish['dishImage']}
        //             alt={dish['dishName']}
        //             style={{
        //                 maxWidth: '150px',
        //                 maxHeight: '150px',
        //             }}
        //         />
        //     }

        //     <div
        //         className="d-flex justify-content-between gap-5"
        //     >
        //         <div
        //             className="d-flex gap-2"
        //         >
        //             <FontAwesomeIcon
        //                 icon={faTrash}
        //                 className="btn btn-primary"
        //                 onClick={handleClickDeleteIcon}
        //             />
        //         </div>
        //     </div>
        // </div>
    );
}

export default CartDishCard;