const AdminDishCard = (props) => {
    const dishId = props.dishId;

    console.log(dishId);

    return (
        <div className="d-flex justify-content-between align-items-center">
            <img src="/assets/images/vectors/addnew.png" style={{ width: "50px" }} alt="" />
            <h5 className="m-0" style={{ maxWidth: "50%" }}>
                Burger + Coke
            </h5>
            <p className="m-0">
                <i className="fa-solid fa-indian-rupee-sign me-2"></i>30
            </p>
        </div>
    );
}

export default AdminDishCard;