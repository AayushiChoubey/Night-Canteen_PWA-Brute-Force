import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import { setDishesRedux } from './redux/slices/dishSlice';
import { setOrdersRedux } from './redux/slices/orderSlice';

import AdminDashboard from './admin/pages/AdminDashboard/AdminDashboard';
import HomePage from './public/pages/HomePage/HomePage';
import AdminEditPage from './admin/pages/AdminEditPage/AdminEditPage';
import CartPage from './public/pages/CartPage/CartPage';
import NavbarComponent from './public/components/NavbarComponent/NavbarComponent';
import LoginPage from './public/pages/LoginPage/LoginPage';
import ErrorPage from './public/pages/ErrorPage/ErrorPage';

import { io } from 'socket.io-client';

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user ? state.user.value : null);

  useEffect(() => {
    let socket = io(process.env.REACT_APP_API_URL);
    socket.on('dishes', (data) => {
      dispatch(setDishesRedux(data));
    });
    socket.on('orders', (data) => {
      dispatch(setOrdersRedux(data));
    });
  }, [dispatch]);

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
        <Route exact path='/admin/dashboard' element={user && user.userType === '1' ? <AdminDashboard /> : <ErrorPage mssg="Unauthorized" code="401" />} />
        <Route exact path='/admin/edit' element={user && user.userType === '1' ? <AdminEditPage /> : <ErrorPage mssg="Unauthorized" code="401" />} />
      </Routes>
    </>
  );
}

export default App;
