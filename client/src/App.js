import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { login } from './redux/slices/userSlice';
import AdminDashboard from './admin/pages/AdminDashboard/AdminDashboard';
import HomePage from './admin/pages/public/pages/HomePage/HomePage';
import AdminEditPage from './admin/pages/AdminEditPage/AdminEditPage';

import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  const dispatch = useDispatch();

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
    dispatch(login(decodedToken));
  }

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
      <Route path='/admin/dashboard' element={<AdminDashboard />} />
      <Route path='/admin/edit' element={<AdminEditPage />} />
    </Routes>
  );
}

export default App;
