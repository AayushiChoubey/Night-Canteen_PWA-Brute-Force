import { useEffect, useState } from 'react';
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

import { BallTriangle } from 'react-loader-spinner';

const App = () => {
  const dispatch = useDispatch()

  const user = useSelector((state) => state.user ? state.user.value : null);
  const [initialDishesLoaded, setInitialDishesLoaded] = useState(false);
  const [initialOrdersLoaded, setInitialOrdersLoaded] = useState(false);
  useEffect(() => {
    let socket = io(process.env.REACT_APP_API_URL);

    socket.on('dishes', (data) => {
      setInitialDishesLoaded(true);
      dispatch(setDishesRedux(data));
    });

    socket.on('orders', (data) => {
      setInitialOrdersLoaded(true);
      dispatch(setOrdersRedux(data));
    });
  }, [dispatch]);

  useEffect(() => {
    if (initialDishesLoaded && initialOrdersLoaded) {
      setLoading(false);
    }
  }, [initialDishesLoaded, initialOrdersLoaded]);

  const [loading, setLoading] = useState(true);
  const [loadingDots, setLoadingDots] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setLoadingDots((loadingDots) => (loadingDots + 1) % 4);
    }, 500);
    return () => clearInterval(interval);
  }, []);


  return (
    <>
      {loading ?
        <div
          style={{
            height: '100vh',
            width: '100vw',
            display: 'flex',
            flexDirection: 'column',
            gap: '40px',
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <BallTriangle
            height={'150px'}
            width={'150px'}
            radius={5}
            color="#4fa94d"
            ariaLabel="ball-triangle-loading"
            visible
          />
          <span
            className='fs-3'
          >
            Loading{Array(loadingDots).fill('.').join('')}
          </span>
        </div>
        :
        <>
          <NavbarComponent />
          <Routes>
            {/* public routes */}
            <Route path='/' element={<HomePage />} />
            <Route path='/home' element={<HomePage />} />
            <Route path='/login' element={<LoginPage />} />
            <Route path='/cart' element={<CartPage />} />

            {/* admin routes */}
            <Route exact path='/admin/dashboard' element={user && user.userType === '1' ? <AdminDashboard /> : <ErrorPage mssg="Unauthorized" code="401" />} />
            <Route exact path='/admin/edit' element={user && user.userType === '1' ? <AdminEditPage /> : <ErrorPage mssg="Unauthorized" code="401" />} />

            <Route path='*' element={<ErrorPage mssg="Page Not Found" code="404" />} />
          </Routes>
        </>}
    </>
  );
}

export default App;
