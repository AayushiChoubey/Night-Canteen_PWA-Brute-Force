import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/slices/userSlice";

const HomePage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user ? state.user.value : null);

    const handleSignOutClick = () => {
        dispatch(logout());
    }

    return (
        <div>
            {user ?
                <>
                    <button onClick={handleSignOutClick}>Sign Out</button>
                </>
                :
                <>
                    <div id='googleSignInDiv'></div>
                </>
            }
        </div>
    );
}

export default HomePage;