import jwtDecode from 'jwt-decode';
import React, { useCallback, useEffect } from 'react'
import { Card } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { loginUserRedux } from '../../../redux/slices/userSlice';
import { generateJWTToken } from '../../../repository/userHandler';

function LoginPage() {
  const dispatch = useDispatch();
  const navigate  = useNavigate();

  const handleGoogleCallbackResponse = useCallback(async (response) => {
    const decodedToken = jwtDecode(response.credential);
    try {
      const userId = decodedToken['jti'];
      const userName = decodedToken['name'];
      const userEmail = decodedToken['email'];
      const response = await generateJWTToken(userId, userName, userEmail);
      const userData = response.data['userData'];
      dispatch(loginUserRedux(userData));

      if (userData.userType === '0') navigate('/');
      else navigate('/admin/dashboard');
      document.body.style.backgroundColor = '#fff';
    } catch (err) {
      console.log(err);
    }
  }, [dispatch, navigate])

  useEffect(() => {
      const currentColor = document.body.style.backgroundColor;
      document.body.style.backgroundColor = '#212529';
      
      return () => {
        document.body.style.backgroundColor = currentColor;
      }
    }, [])
    
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
  }, [handleGoogleCallbackResponse])

    return (
        <div>
            <Card className='mx-auto' style={{width:"18rem", marginTop:"100px"}}>
                <Card.Body className='text-center'>
                    <div className="text-center mt-4">
                        <img src="/android-chrome-192x192.png" alt="logo" style={{ width: '75px' }} />
                        <h3 style={{ color: "#FFD600" }}>Night Cravings</h3>
                    </div>
                    <div>
                        <p className="mt-4 mb-0">Login to Continue</p>
                        <p className="text-muted mt-0">(Use Institute Id)</p>
                    </div>
                    <div className='mx-auto my-4 d-flex justify-content-center' id='googleSignInDiv'></div>
                </Card.Body>
            </Card>
        </div>
    )
}

export default LoginPage
