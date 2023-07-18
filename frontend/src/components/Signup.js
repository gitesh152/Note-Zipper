import React, { useEffect, useState } from 'react'
import { MainScreen } from '/'
import { Button, Form, Spinner } from 'react-bootstrap';
import { ErrorMessage } from './';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { signup } from '../actions/userAction';

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmpassword, setConfirmpassword] = useState('');
    const [pic, setPic] = useState('');
    const [passwordType, setPasswordType] = useState('password');
    const [message, setMessage] = useState(false);
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const { userInfo, loading, error, success } = useSelector((state) => state.userState);

    useEffect(() => {
        //If user is logged in then redirect to /mynotes
        if (userInfo) Navigate('/mynotes')
    }, [Navigate, success, userInfo])

    const handleTogglePassword = () => {
        const passType = passwordType === 'password' ? 'text' : 'password';
        setPasswordType(passType)
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

    const submitHandler = async (e) => {
        e.preventDefault();
        if ((email, password, confirmpassword, pic)) {
            if (password !== confirmpassword) {
                setMessage('Passwords do not match !!!');
            } else {
                setMessage('');
                dispatch(signup(name, email, password, pic));
            }
        }
    };


    return (
        <MainScreen title='SIGNUP'>

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
                {message && <ErrorMessage variant="danger">{message}</ErrorMessage>}
                {success && <ErrorMessage variant="success">{success}</ErrorMessage>}

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
                            placeholder="Enter email"
                            value={email}
                            required
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
                            required
                            onChange={(e) => setPassword(e.target.value)}
                        />
                    </Form.Group>

                    <Form.Group className="mb-3" controlId="formBasicConfirmPassword">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control
                            type={passwordType}
                            placeholder="Password"
                            value={confirmpassword}
                            required
                            onChange={(e) => setConfirmpassword(e.target.value)}
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
                            required
                        />
                    </Form.Group>
                    <Button variant="primary" type="submit">
                        Submit
                    </Button>
                </Form>
            </div>


        </MainScreen>
    )
}

export default Signup
