import React, { useEffect, useState } from 'react'
import { MainScreen, ErrorMessage } from './'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { Button, Col, Form, Image, Row, Spinner } from 'react-bootstrap'
import { updateProfile } from '../actions/userAction'


const Profile = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [pic, setPic] = useState('');
    const [message, setMessage] = useState('');
    const [passwordType, setPasswordType] = useState('password')
    const Navigate = useNavigate();
    const dispatch = useDispatch();
    const { userInfo, loading, error, success } = useSelector(state => state.userState)


    const handleTogglePassword = () => {
        const passType = passwordType === 'password' ? 'text' : 'password';
        setPasswordType(passType);
    }

    const postDetails = (pic) => {
        if (!pic) return setMessage('Please select a image');

        if (
            pic.type === 'image/jpeg' ||
            pic.type === 'image/jpg' ||
            pic.type === 'image/png'
        ) {
            setMessage(null);
            const data = new FormData();
            data.append('file', pic);
            data.append('upload_preset', 'note-zipper');
            data.append('cloud_name', 'dm34wmjlm');
            fetch('https://api.cloudinary.com/v1_1/dm34wmjlm/image/upload', {
                method: 'POST',
                body: data,
            }).then(res => res.json()).then(data => {
                console.log('Uploaded Pic : ', data)
                setPic(data.url.toString());
            }).catch((err) => {
                setMessage(err);
            });
        }
        else {
            return setMessage('Image should be jpg/jpeg/png');
        }


    }

    useEffect(() => {
        //If user is not logged in then redirect to home
        if (!userInfo) Navigate('/')
        else {
            setName(userInfo.name)
            setEmail(userInfo.email)
            setPic(userInfo.pic)
        }

    }, [Navigate, userInfo]);


    const submitHandler = (e) => {
        e.preventDefault();
        if (password === confirmPassword) {
            dispatch(updateProfile({ name, email, password, pic }));
            setMessage('');
        } else {
            setMessage('Password do not match ...');
        }
    };

    return (
        <MainScreen title="EDIT PROFILE">
            <div>
                {loading && (
                    <Spinner
                        style={{ width: '100px', height: '100px' }}
                        animation="border"
                        variant="info"
                        size="lg"
                        className="position-absolute top-50 start-50"
                    />
                )}
                {success && <ErrorMessage variant="success">{success}</ErrorMessage>}
                {error && <ErrorMessage variant="danger">{error}</ErrorMessage>}
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                <Row className="profileContainer">
                    <Col md={6}>
                        <Form onSubmit={submitHandler}>
                            <Form.Group className="mb-3" controlId="formName">
                                <Form.Label>Name</Form.Label>
                                <Form.Control
                                    type="text"
                                    placeholder="Enter name"
                                    value={name}
                                    required
                                    onChange={(e) => setName(e.target.value)}
                                />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Email address</Form.Label>
                                <Form.Control
                                    type="email"
                                    disabled
                                    placeholder="Enter email"
                                    value={email}
                                    required
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                                <Form.Text className="text-muted">
                                    You can not change mail.
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
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                                <Form.Label>Confirm Password</Form.Label>
                                <Form.Control
                                    type={passwordType}
                                    placeholder="Password"
                                    value={confirmPassword}
                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                />
                                <Form.Check // prettier-ignore
                                    type="switch"
                                    id="custom-switch"
                                    label="Show Password"
                                    onClick={handleTogglePassword}
                                />
                            </Form.Group>

                            <Form.Group controlId="formFile" className="mb-3">
                                <Form.Label>Provide profile picture</Form.Label>
                                <Form.Control
                                    type="file"
                                    onChange={(e) => {
                                        postDetails(e.target.files[0]);
                                    }}
                                />
                            </Form.Group>
                            <Button variant="primary" type="submit">
                                Submit
                            </Button>
                        </Form>
                    </Col>
                    <Col
                        style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                        }}
                    >
                        <Image
                            src={pic}
                            alt={name}
                            thumbnail
                            style={{ width: '200px', height: '350px' }}
                            className="profilePic"
                        />
                    </Col>
                </Row>
            </div>
        </MainScreen>
    )
}

export default Profile
