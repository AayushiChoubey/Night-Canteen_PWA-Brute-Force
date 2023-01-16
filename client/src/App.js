import { useEffect } from 'react';
import { Routes, Route, useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import jwtDecode from 'jwt-decode';

import { loginUserRedux } from './redux/slices/userSlice';
import { setDishesRedux } from './redux/slices/dishSlice';
import { setOrdersRedux } from './redux/slices/orderSlice';

import { getAllDishes } from './repository/dishHandler';
import { getAllOrders } from './repository/orderHandler';
import { generateJWTToken } from './repository/userHandler';

import AdminDashboard from './admin/pages/AdminDashboard/AdminDashboard';
import HomePage from './public/pages/HomePage/HomePage';
import AdminEditPage from './admin/pages/AdminEditPage/AdminEditPage';
import CartPage from './public/pages/CartPage/CartPage';
import NavbarComponent from './public/components/NavbarComponent/NavbarComponent';
import LoginPage from './public/pages/LoginPage/LoginPage';
import ErrorPage from './public/pages/ErrorPage/ErrorPage';

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const user = useSelector((state) => state.user ? state.user.value : null);

  // user authentication
  useEffect(() => {
    if (window.google) {
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
    }
  }, [window.google])

  const handleGoogleCallbackResponse = async (response) => {
    const decodedToken = jwtDecode(response.credential);
    try {
      const userId = decodedToken['jti'];
      const userName = decodedToken['name'];
      const userEmail = decodedToken['email'];
      const response = await generateJWTToken(userId, userName, userEmail);
      const userData = response.data['userData'];
      dispatch(loginUserRedux(userData));

      if (user.userType === '0') navigate('/');
      else navigate('/admin/dashboard');
      document.body.style.backgroundColor = '#fff';
    } catch (err) {
      console.log(err);
    }
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

  // get all orders
  useEffect(() => {
    getAllOrders()
      .then((response) => {
        const orders = response.data['orders'];
        dispatch(setOrdersRedux(orders));
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const orders = useSelector((state) => state.orders ? state.orders.value : null);

  return (
    <>
      <NavbarComponent />
      <Routes>
        {/* public routes */}
        <Route path='/' element={<HomePage />} />
        <Route path='/home' element={<HomePage />} />
        <Route path='/login' element={<LoginPage />} />
        <Route path='/cart' element={<CartPage />} />
        <Route path='/*' element={<ErrorPage mssg="Page Not Found" code="404" />} />

        {/* admin routes */}
        <Route exact path='/admin/dashboard' element={user.userType === '1' ? <AdminDashboard /> : <ErrorPage mssg="Unauthorized" code="401" />} />
        <Route exact path='/admin/edit' element={user.userType === '1' ? <AdminEditPage /> : <ErrorPage mssg="Unauthorized" code="401" />} />
      </Routes>
    </>
  );
}

export default App;
