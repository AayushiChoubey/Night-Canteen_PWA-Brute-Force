import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import jwtDecode from 'jwt-decode';
import { useDispatch } from 'react-redux';
import { login } from './redux/slices/userSlice';

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
    </Routes>
  );
}

export default App;
