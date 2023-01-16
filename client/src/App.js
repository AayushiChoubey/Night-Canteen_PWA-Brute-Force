import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { loginUserRedux } from './redux/slices/userSlice';
import { setDishesRedux } from './redux/slices/dishSlice';
import { setOrdersRedux } from './redux/slices/orderSlice';
import AdminDashboard from './admin/pages/AdminDashboard/AdminDashboard';
import HomePage from './public/pages/HomePage/HomePage';
import AdminEditPage from './admin/pages/AdminEditPage/AdminEditPage';
import { useSelector } from 'react-redux';

import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllDishes } from './repository/dishHandler';
import CartPage from './public/pages/CartPage/CartPage';
import { getAllOrders } from './repository/orderHandler';
import { generateJWTToken } from './repository/userHandler';

const App = () => {
  const dispatch = useDispatch();

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
  console.log(orders);

  return (
    <Routes>
      {/* public routes */}
      <Route path='/' element={<HomePage />} />
      <Route path='/cart' element={<CartPage />} />

      {/* admin routes */}
      <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Route path='/admin/edit' element={<AdminEditPage />} />
    </Routes>
  );
}

export default App;
