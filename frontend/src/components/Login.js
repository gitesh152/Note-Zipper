import React, { useEffect, useState } from 'react'
import { MainScreen, ErrorMessage } from '/';
import { Button, Col, Form, Row, Spinner } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux'
import { login } from '../actions/userAction';


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [passwordType, setPasswordType] = useState('password')
    const dispatch = useDispatch();
    const { loading, error, userInfo } = useSelector(state => state.userState);
    const Navigate = useNavigate();

    useEffect(() => {
        //If user is logged in then redirect to /mynotes
        if (userInfo) Navigate('/mynotes');
    })

    const submitHandler = (e) => {
        e.preventDefault();
        if (email && password) {
            dispatch(login(email, password));
        }
    }

    const handleTogglePassword = () => {
        const passType = passwordType === 'password' ? 'text' : 'password';
        setPasswordType(passType)
    }

    return (
        <MainScreen title='LOGIN'>
            <div className="mt-4 position-relative">
                {loading && (
                    <Spinner
                        style={{ width: '100px', height: '100px' }}
                        animation="border"
                        variant="info"
                        size="lg"
                        className="position-absolute top-50 start-50"
                    />
                )}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                <Form onSubmit={submitHandler}>
                    <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>Email address</Form.Label>
                        <Form.Control
                            type="email"
                            placeholder="Enter email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            We'll never share your email with anyone else.
                        </Form.Text>
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Password</Form.Label>
                        <Form.Control
                            type={passwordType}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                        />
                        <Form.Text className="text-muted">
                            <Form.Check // prettier-ignore
                                type="switch"
                                id="custom-switch"
                                label="Show Password"
                                onClick={handleTogglePassword}
                            />
                        </Form.Text>
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
                <Row className="py-3">
                    <Col>
                        New Customer&nbsp;
                        <Link to="/signup" className="text-primary">
                            Register Here
                        </Link>
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default Login
