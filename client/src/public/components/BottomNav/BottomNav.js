import React from 'react'
import { Button, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function BottomNav() {
  return (
    <div>
        <Navbar variant='light' bg='light' fixed='bottom'>
            <Nav className='me-auto'>
                <Nav.Link>
                    <h6 className='mb-0 text-danger'>Total</h6>
                    <h2 className='mb-0'><i className='fa-solid fa-indian-rupee-sign'/>2999</h2>
                </Nav.Link>
            </Nav>
            <Nav>
                <Nav.Link as={Link} to="/cart">
                    <Button variant='warning'>Place Order</Button>
                </Nav.Link>
            </Nav>
        </Navbar>
    </div>
  )
}

export default BottomNav