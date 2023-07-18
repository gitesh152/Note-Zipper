import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'

const Footer = () => {
    return (
        <div style={{ width: '100%', display: 'flex', position: 'relative', bottom: '0px', justifyContent: 'center' }}>
            <Container>
                <Row>
                    <Col className='text-center py-3'>Copyright &copy; Note Zipper</Col>
                </Row>
            </Container>
        </div>
    )
}

export default Footer
