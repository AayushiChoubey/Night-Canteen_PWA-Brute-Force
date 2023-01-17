import React from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { Link } from 'react-router-dom'

function BottomNav(props) {
    return (
        <Container>
            <Navbar className="px-3" variant='light' bg='light' fixed='bottom' style={{boxShadow: "0 0 8px 0 rgb(0 0 0 / 25%)"}}>
                <Nav className='me-auto'>
                    <Nav.Link>
                        <h6 className='mb-0 text-danger'>Total</h6>
                        {/* ToDo
                        Replace Amount total with state */}
                        <h2 className='mb-0'><i className='fa-solid fa-indian-rupee-sign' />2999</h2>
                    </Nav.Link>
                </Nav>
                <Nav>
                    {/* ToDo: Disable Pay to Order Button if Order total is 0 */}
                    {props.type === 'home' ?
                        (<Nav.Link>
                            <Button variant='warning' onClick={props.func}>Confirm Order</Button>
                        </Nav.Link>) :
                        (<Nav.Link>
                            <Button variant='warning' onClick={props.func}>Pay to Order</Button>
                        </Nav.Link>)
                    }
                </Nav>
            </Navbar>
        </Container>
    )
}

export default BottomNav