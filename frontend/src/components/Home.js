import React, { useEffect } from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

const Home = () => {
    const Navigate = useNavigate();
    const { userInfo } = useSelector(state => state.userState);

    useEffect(() => {
        //If user is logged in then redirect to /mynotes
        if (userInfo) Navigate('/mynotes');
    })
    return (
        <div className='main'>
            <Container>
                <Row>
                    <div className='intro-text'>
                        <h1 className='title'>Welcome to Note Zipper</h1>
                        <p className='subtitle'>
                            One safe place for all your notes.
                        </p>
                    </div>
                </Row>
                <Row>
                    <div className='btn-group'>
                        <Link to="/login">
                            <Button size="lg" className="landingButton">
                                Login
                            </Button>
                        </Link>
                        <Link to="/signup">
                            <Button
                                size="lg"
                                className="landingButton"
                                variant="outline-primary"
                            >
                                Signup
                            </Button>
                        </Link>
                    </div>
                </Row>
            </Container>
        </div>
    )
}

export default Home
