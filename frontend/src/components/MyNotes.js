import React, { useEffect } from 'react'
import { MainScreen, ErrorMessage } from './index'
import { useSelector, useDispatch } from 'react-redux'
import { Accordion, Badge, Button, Card, Spinner, useAccordionButton } from 'react-bootstrap'
import { deleteNote, listNotes } from '../actions/noteAction.js'
import { Link, useNavigate } from 'react-router-dom'

//Custon Toggle for Accordion
function CustomToggle({ children, eventKey }) {
    const decoratedOnClick = useAccordionButton(eventKey, () =>
        console.log('totally custom!')
    );

    return (
        <button
            type="button"
            style={{ fontFamily: 'sans-serif' }}
            className="border border-0"
            onClick={decoratedOnClick}
        >
            {children}
        </button>
    );
}

const MyNotes = ({ search }) => {
    const noteState = useSelector((state) => state.noteState)
    const { userInfo } = useSelector((state) => state.userState)
    const dispatch = useDispatch();
    const Navigate = useNavigate();
    const { notes, loading, success, error } = noteState;

    const deleteHandler = (id) => {
        if (window.confirm('Are you sure ?')) {
            dispatch(deleteNote(id));
        }

    }

    useEffect(() => {
        //If user is not logged in then redirect to home
        if (!userInfo) Navigate('/')
        dispatch(listNotes());
    }, [Navigate, dispatch, success, userInfo, error])


    return (

        <MainScreen title='Welcome Back Ansh'>
            {error && <ErrorMessage variant='danger'>{error} </ErrorMessage>}
            {success && <ErrorMessage variant='success'>{success} </ErrorMessage>}
            <Link to='/createnote' >
                <Button size='lg' style={{ margin: '10px', marginBottom: '6px' }}>Create Note</Button>
            </Link>
            {loading && (
                <Spinner
                    style={{ width: '100px', height: '100px', zIndex: 1 }}
                    animation="border"
                    variant="info"
                    size="lg"
                    className="position-absolute top-50 start-50"
                />
            )}
            {/* Filter is used for search input */}
            {notes?.filter((note) => note.title.toLowerCase().includes(search.toLowerCase())).map((note) => (
                <Accordion key={note._id} >
                    <Card style={{ margin: '10px' }}>
                        <Card.Header style={{ display: 'flex' }}>
                            <span
                                style={{
                                    flex: 1,
                                    textDecoration: 'none',
                                    color: 'black',
                                    cursor: 'pointer',
                                    alignSelf: 'center',
                                    fontSize: '18px',
                                }}
                            >
                                <CustomToggle as={Card.Text} variant="link" eventKey="0">
                                    {note.title}
                                </CustomToggle>
                            </span>
                            <div className='ms-2'>
                                <Button href={`/note/${note._id}`}> Edit</Button>
                                <Button
                                    variant="danger"
                                    className="mx-2"
                                    onClick={() => deleteHandler(note._id)}
                                >
                                    Delete
                                </Button>
                            </div>
                        </Card.Header>
                        <Accordion.Collapse eventKey="0">
                            <Card.Body>
                                <h4>
                                    <Badge bg="success">Category - {note.category}</Badge>
                                </h4>
                                <blockquote className="blockquote mb-0">
                                    <p>{note.content}</p>
                                    <footer className="blockquote-footer">
                                        Created on{' '}
                                        <cite title="Source Title">
                                            {note.createdAt.substring(0, 10)}
                                        </cite>
                                    </footer>
                                </blockquote>
                            </Card.Body>
                        </Accordion.Collapse>
                    </Card>
                </Accordion>
            ))}
        </MainScreen >
    )
}

export default MyNotes
