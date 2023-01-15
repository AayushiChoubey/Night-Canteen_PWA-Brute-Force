import { useDispatch, useSelector } from "react-redux";
import { logoutUserRedux } from "../../../redux/slices/userSlice";

const HomePage = () => {
    const dispatch = useDispatch();

    const user = useSelector((state) => state.user ? state.user.value : null);

    const handleSignOutClick = () => {
        dispatch(logoutUserRedux());
    }

    return (
        <div>
            {user ?
                <>
                    <button onClick={handleSignOutClick}>Sign Out</button>
                </>
                :
                <>
                    <div id='googleSignInDiv2'></div>
                </>
            }
        </div>
    );
}

export default HomePage;