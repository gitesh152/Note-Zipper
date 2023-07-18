import React, { useState } from 'react'
import MainScreen from '../screens/MainScreen/MainScreen'
import { Button, Card, Form } from 'react-bootstrap'
import { ReactMarkdown } from 'react-markdown/lib/react-markdown'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { createNote } from '../actions/noteAction'
import ErrorMessage from './ErrorMessage'

const CreateNote = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');
    const [category, setCategory] = useState('');
    const [message, setMessage] = useState('');
    const dispatch = useDispatch();
    const Navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!title || !content || !category) {
            setMessage('Please fill all fields ...')
        }
        else {
            dispatch(createNote(title, content, category))
            handleReset();
            Navigate('/mynotes')
        }
    }

    //Resetting all fields
    const handleReset = () => {
        setTitle('')
        setContent('')
        setCategory('')
    }

    return (
        <MainScreen title='CREATE NOTE'>
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
                            Create Note
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
                    Created on - {new Date().toLocaleDateString()}
                </Card.Footer>
            </Card>
        </MainScreen >
    )
}

export default CreateNote
