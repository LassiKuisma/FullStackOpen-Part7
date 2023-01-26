import { useState } from 'react'
import { Form, Table, Button, Alert, Navbar, Nav } from 'react-bootstrap'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate, Navigate, useMatch
} from "react-router-dom"

const Home = () => (
  <div> <h2>Notes app</h2> </div>
)

const Note = ({ note }) => {
  return (
    <div>
      <h2>{note.content}</h2>
      <div>{note.user}</div>
      <div><strong>{note.important ? 'important' : ''}</strong></div>
    </div>
  )
}

const Notes = ({ notes }) => {
  return (
    <div>
      <h2>Notes</h2>
      <Table striped>
        <tbody>
          {notes.map(note =>
            <tr key={note.id}>
              <td>
                <Link to={`/notes/${note.id}`}>
                  {note.content}
                </Link>
              </td>
              <td>
                {note.user}
              </td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

const Login = (props) => {
  const navigate = useNavigate()

  const onSubmit = (event) => {
    event.preventDefault()
    props.onLogin('lassi')
    navigate('/')
  }

  return (
    <div>
      <h2>Login</h2>
      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Form.Label>Username:</Form.Label>
          <Form.Control
            type="text"
            name="username"
          />
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
          />
          <Button variant="primary" type="submit">
            Login
          </Button>
        </Form.Group>
      </Form>
    </div>
  )
}

const Users = () => (
  <div> <h2>Users</h2> </div>
)

const App = () => {
  const [notes, setNotes] = useState([
    {
      id: 1,
      content: "Hi I'm a note",
      user: "Lassi"
    }
  ])

  const [message, setMessage] = useState(null)

  const [user, setUser] = useState(null)
  const login = (user) => {
    setUser(user)
    setMessage(`Welcome ${user}`)
    setTimeout(() => {
      setMessage(null)
    }, 10000)
  }


  const padding = {
    padding: 5
  }

  const match = useMatch('notes/:id')
  const note = match
    ? notes.find(note => note.id === Number(match.params.id))
    : null

  return (
    <div className="container">
      <div className="container">
        {(message &&
          <Alert variant="success">
            {message}
          </Alert>
        )}
      </div>

      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/">home</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/notes">notes</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link style={padding} to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              {user
                ? <em style={padding}>{user} logged in</em>
                : <Link style={padding} to="/login">login</Link>
              }
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <div>
        <i>Note app, made by me :)</i>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)