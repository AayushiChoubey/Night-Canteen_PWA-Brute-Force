import React, { useEffect } from 'react'
import { Card } from 'react-bootstrap';

function LoginPage() {

    useEffect(() => {
        document.body.style.backgroundColor = '#212529';
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

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