import { useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage/HomePage';
import jwtDecode from 'jwt-decode';

const App = () => {

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
    console.log(decodedToken);
  }

  return (
    <Routes>
      <Route path='/' element={<HomePage />} />
    </Routes>
  );
}

export default App;
