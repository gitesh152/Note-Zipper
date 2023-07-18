import React, { useEffect, useState } from 'react'
import MainScreen from '../screens/MainScreen/MainScreen'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, useParams } from 'react-router-dom';
import ErrorMessage from './ErrorMessage';
import { Button, Card, Form } from 'react-bootstrap';
import { ReactMarkdown } from 'react-markdown/lib/react-markdown';
import axios from 'axios';
import { updateNote } from '../actions/noteAction';

const SingleNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [date, setDate] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const params = useParams();
    const { userInfo } = useSelector((state) => state.userState);


    useEffect(() => {

        //If user is not logged in then redirect to home
        if (!userInfo) Navigate('/')

        const fetchNote = async () => {
            const config = {
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${userInfo.token}`
                }
            }
            const { data } = await axios.get(`/api/notes/${params.id}`, config)
            setTitle(data.note.title);
            setContent(data.note.content);
            setCategory(data.note.category);
            setDate(data.note.createdAt);

        }
        fetchNote();
    }, [Navigate, params.id, userInfo])

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !content || !category) {
            setMessage('Please fill all fields ...');
        } else {
            setMessage('')
            dispatch(updateNote(params.id, title, content, category));
            handleReset();
            Navigate('/mynotes')
        }
    }

    //Reset fields
    const handleReset = () => {
        setTitle('')
        setContent('')
        setCategory('')
    }
    return (
        <MainScreen title='EDIT NOTE'>
            {message && <ErrorMessage variant='danger'>{message}</ErrorMessage>}
            <Card>
                <Card.Header>
                    Create note.
                </Card.Header>
                <Card.Body>
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Title</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter The Title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                            />
                        </Form.Group>
                        <Form.Group className="mb-3" controlId="formTitle">
                            <Form.Label>Content</Form.Label>
                            <Form.Control
                                as='textarea'
                                rows={3}
                                placeholder="Write Something."
                                value={content}
                                onChange={(e) => setContent(e.target.value)}
                            />
                        </Form.Group>
                        {content &&
                            <Card>
                                <Card.Header>Note Preview</Card.Header>
                                <Card.Body><ReactMarkdown></ReactMarkdown>{content}</Card.Body>
                            </Card>
                        }
                        <Form.Group className="mb-3" controlId="formCategory">
                            <Form.Label>Category</Form.Label>
                            <Form.Control
                                type="text"
                                placeholder="Enter The Category ..."
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            />
                        </Form.Group>

                        <Button variant="primary" type="submit" >
                            Update Note
                        </Button>
                        <Button
                            variant="warning"
                            type="button"
                            onClick={() => {
                                handleReset();
                            }}
                            className="mx-3"
                        >
                            Reset Fields
                        </Button>
                    </Form>
                </Card.Body>
                <Card.Footer>
                    Updated on - {date.substring(0, 10)}
                </Card.Footer>
            </Card>
        </MainScreen>
    )
}

export default SingleNote
