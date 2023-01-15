import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useDispatch, useSelector } from 'react-redux';
import { loginUserRedux } from './redux/slices/userSlice';
import { random, setDishesRedux} from './redux/slices/dishSlice';
import AdminDashboard from './admin/pages/AdminDashboard/AdminDashboard';
import HomePage from './public/pages/HomePage/HomePage';
import AdminEditPage from './admin/pages/AdminEditPage/AdminEditPage';

import 'bootstrap/dist/css/bootstrap.min.css';
import { getAllDishes } from './repository/dishHandler';

const App = () => {
  const dispatch = useDispatch();

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
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Route path='/admin/edit' element={<AdminEditPage />} />
    </Routes>
  );
}

export default App;
