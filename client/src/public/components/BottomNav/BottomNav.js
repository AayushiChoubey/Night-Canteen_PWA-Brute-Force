import {useState, useEffect} from 'react'
import { Button, Container, Nav, Navbar } from 'react-bootstrap'
import { useSelector } from 'react-redux'

function BottomNav(props) {
    const cart = useSelector((state) => state.cart ? state.cart.value : null)
    const dishes = useSelector((state) => state.dishes ? state.dishes.value : null)
    const [total, setTotal] = useState(0)
    useEffect(() => {
        let temp = 0
        cart.forEach((dish) => {
            // get the dish from the dishes array
            const element = dishes.find((element) => element['dishId'] === dish['dishId'])
            temp += element['dishPrice'] * dish['dishCount']
        })
        setTotal(temp)
    }, [cart, dishes])

    return (
        <Container>
            <Navbar className="px-3" variant='light' bg='light' fixed='bottom' style={{boxShadow: "0 0 8px 0 rgb(0 0 0 / 25%)"}}>
                <Nav className='me-auto'>
                    <Nav.Link>
                        <h6 className='mb-0 text-danger'>Total</h6>
                        {/* ToDo
                        Replace Amount total with state */}
                        <h2 className='mb-0'><i className='fa-solid fa-indian-rupee-sign' />{total}</h2>
                    </Nav.Link>
                </Nav>
                <Nav>
                    {props.type === 'home' ?
                        (<Nav.Link>
                            <Button disabled={total === 0} variant='warning' onClick={props.func}>Confirm Order</Button>
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