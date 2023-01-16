import React from 'react'
import { Container } from 'react-bootstrap'

function ErrorPage(props) {
  return (
    <Container className='text-center mt-5'>
        <h1 className="display-1 text-bold text-warning">{props.code}</h1>
        <h3 className="display-4">{props.mssg}</h3>
    </Container>
  )
}

export default ErrorPage