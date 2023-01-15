import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, Link } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logoutUserRedux } from "../../redux/slices/userSlice";

function NavbarComponent() {

    const dispatch = useDispatch();

    const user = useSelector((state) => state.user ? state.user.value : null);

    const handleSignOutClick = () => {
        dispatch(logoutUserRedux());
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" sticky="top">
                <Container>
                    <Navbar.Brand as={Link} to="#home"><img src="/favicon-32x32.png" alt="" /></Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="/home">Home</Nav.Link>
                    </Nav>
                    <Nav className="align-items-center">
                        {/* <Nav.Link as={NavLink} to="/cart"><i className="me-2 fa-solid fa-cart-shopping"/>Cart</Nav.Link> */}
                        <Nav.Link as={NavLink} to="/admin/edit"><i className="me-2 fa-solid fa-plus" />Add Dishes</Nav.Link>
                        {
                            user ?
                                <Nav.Link>
                                    <Button  variant='warning' onClick={handleSignOutClick}>Sign Out</Button>
                                </Nav.Link>
                                :
                                <Nav.Link as={Link} to='/login' >
                                    <Button variant='warning'>Login</Button>
                                </Nav.Link>
                        }
                        
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarComponent