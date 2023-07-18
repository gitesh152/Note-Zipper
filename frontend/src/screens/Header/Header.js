import React from 'react'
import { Container, Form, Nav, NavDropdown, Navbar } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { USER_LOGOUT } from '../../actions/actionTypes'

const Header = ({ setSearch }) => {
    const dispatch = useDispatch()
    const { userInfo } = useSelector(state => state.userState)
    const logoutHandler = () => {
        //Logout user by remove userInfo from storage.
        localStorage.removeItem('userInfo');
        dispatch({ type: USER_LOGOUT });
    }
    return (
        <Navbar expand="lg" bg="primary" variant="dark">
            <Container>
                <Navbar.Brand><Link to='/' style={{ color: 'white', textDecoration: 'none' }}><b> NOTE ZIPPER</b></Link></Navbar.Brand>
                <Navbar.Toggle aria-controls="navbarScroll" />
                <Navbar.Collapse id="navbarScroll" style={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Nav className='mx-auto'>
                        <Form className="">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                                onChange={(e) => setSearch(e.target.value)}
                            />
                        </Form>
                    </Nav>
                    {userInfo ?
                        <Nav
                            className="my-2 my-lg-0"
                            style={{ maxHeight: '100px' }}
                            navbarScroll
                        >
                            <Nav.Link to="/mynotes" as={Link}>MyNotes</Nav.Link>

                            <NavDropdown title={userInfo.name} id="navbarScrollingDropdown">

                                <NavDropdown.Item as={Link} to="/profile">
                                    My Profile
                                </NavDropdown.Item>

                                <NavDropdown.Divider />

                                <NavDropdown.Item onClick={logoutHandler}>
                                    Logout
                                </NavDropdown.Item>

                            </NavDropdown>

                        </Nav>
                        :
                        <Nav>
                            <Nav.Link as={Link} to="/login">
                                Login
                            </Nav.Link>
                            <Nav.Link as={Link} to="/signup">
                                Signup
                            </Nav.Link>
                        </Nav>
                    }
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header
