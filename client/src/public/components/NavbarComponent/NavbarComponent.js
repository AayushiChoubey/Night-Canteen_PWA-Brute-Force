import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { NavLink, Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from "react-redux";
import { logoutUserRedux } from "../../../redux/slices/userSlice";

function NavbarComponent() {

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const user = useSelector((state) => state.user ? state.user.value : null);

    const handleSignOutClick = () => {
        dispatch(logoutUserRedux());
        navigate('/')
    }

    return (
        <>
            <Navbar bg="dark" variant="dark" sticky="top" expand={user && user.userType===0 ? true : 'lg'}>
                <Container>
                    <Navbar.Brand as={Link} to="/home"><img src="/favicon-32x32.png" alt="" /></Navbar.Brand>

                    <Nav className="me-auto">
                        <Nav.Link as={Link} to="/home">Home</Nav.Link>
                    </Nav>

                    {
                        user ?
                            <>
                                {user.userType === '0' ?
                                    <Nav className='align-items-center'>
                                        <Nav.Link as={NavLink} to="/cart">
                                            <i className="me-2 fa-solid fa-cart-shopping" />Cart
                                        </Nav.Link>
                                        <Nav.Link>
                                            <Button variant='warning' onClick={handleSignOutClick}>Sign Out</Button>
                                        </Nav.Link>
                                    </Nav>
                                    :
                                    <>
                                        <Navbar.Toggle aria-controls="basic-navbar-nav" />
                                        <Navbar.Collapse id="basic-navbar-nav" className='justify-content-end'>
                                            <Nav className="align-items-center text-end">
                                                <Nav.Link as={NavLink} to="/admin/edit">
                                                    <i className="me-2 fa-solid fa-plus" />Add Dishes
                                                </Nav.Link>
                                                <Nav.Link as={NavLink} to="/admin/dashboard">
                                                    <i className="me-2 fa-solid fa-user" />Admin Dashboard
                                                </Nav.Link>
                                                <Nav.Link>
                                                    <Button variant='warning' onClick={handleSignOutClick}>Sign Out</Button>
                                                </Nav.Link>
                                            </Nav>
                                        </Navbar.Collapse>
                                    </>
                                }

                            </>
                            :
                            <Nav className="align-items-center"><Nav.Link as={Link} to='/login' >
                                <Button variant='warning'>Login</Button>
                            </Nav.Link>
                            </Nav>
                    }
                </Container>
            </Navbar>
        </>
    )
}

export default NavbarComponent