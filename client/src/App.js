import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserRedux } from './redux/slices/userSlice';
import { random, setDishesRedux} from './redux/slices/dishSlice';
import AdminDashboard from './admin/pages/AdminDashboard/AdminDashboard';
import HomePage from './public/pages/HomePage/HomePage';
import AdminEditPage from './admin/pages/AdminEditPage/AdminEditPage';
import NavbarComponent from './public/components/NavbarComponent';

import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllDishes } from './repository/dishHandler';
import LoginPage from './public/pages/LoginPage/LoginPage';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // user authentication
  useEffect(() => {
    // load google from global script
    window.google.accounts.id.initialize({
      client_id: process.env.REACT_APP_OAUTH_CLIENT_ID,
      callback: handleGoogleCallbackResponse
    });

    window.google.accounts.id.renderButton(
      document.getElementById('googleSignInDiv'), {
      theme: 'outline', size: 'large'
    }
    )
  }, [])
  const handleGoogleCallbackResponse = (response) => {
    const decodedToken = jwtDecode(response.credential);
    dispatch(loginUserRedux(decodedToken));
    navigate('/')
    document.body.style.backgroundColor = '#fff';
  }

  // get all dishes
  useEffect(() => {
    getAllDishes()
      .then((response) => {
        const dishes = response.data['dishes'];
        dispatch(setDishesRedux(dishes));
      })
      .catch((err) => {
        console.log(err);
      });
  }, [])

  return (
    <>
      <NavbarComponent/>
      <Routes>
        <Route exact path='/' element={<HomePage />} />
        <Route exact path='/login' element={<LoginPage/>} />
        <Route exact path='/admin/dashboard' element={<AdminDashboard />} />
        <Route exact path='/admin/edit' element={<AdminEditPage />} />
      </Routes>
    </>
  );
}

export default App;
