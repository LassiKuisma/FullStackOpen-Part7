import { useState } from 'react'
import ReactDOM from 'react-dom/client'
import {
  BrowserRouter as Router,
  Routes, Route, Link, useNavigate, Navigate, useMatch
} from "react-router-dom"
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Paper,
} from '@mui/material'
import styled from 'styled-components'

const Button = styled.button`
  background: Bisque;
  font-size: 1em;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid Chocolate;
  border-radius: 3px;
`

const Input = styled.input`
  margin: 0.25em;
`

const Page = styled.div`
  padding: 1em;
  background: papayawhip;
`

const Navigation = styled.div`
  background: BurlyWood;
  padding: 1em;
`

const Footer = styled.div`
  background: Chocolate;
  padding: 1em;
  margin-top: 1em;
`

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
      <TableContainer component={Paper}>
        <Table>
          <TableBody>
            {notes.map(note =>
              <TableRow key={note.id}>
                <TableCell>
                  <Link to={`/notes/${note.id}`}>
                    {note.content}
                  </Link>
                </TableCell>
                <TableCell>
                  {note.user}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
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
      <form onSubmit={onSubmit}>
        <div>
          Username:
          <Input />
        </div>
        <div>
          Password:
          <Input type="password" />
        </div>
        <div>
          <Button type="submit" primary=''>
            Login
          </Button>
        </div>
      </form>
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
    <Page>
      <Navigation>
        <Link style={padding} to="/">home</Link>
        <Link style={padding} to="/notes">notes</Link>
        <Link style={padding} to="/users">users</Link>
        {user
          ? <em>{user} logged in</em>
          : <Link style={padding} to="/login">login</Link>
        }
      </Navigation>

      <Routes>
        <Route path="/notes/:id" element={<Note note={note} />} />
        <Route path="/notes" element={<Notes notes={notes} />} />
        <Route path="/users" element={user ? <Users /> : <Navigate replace to="/login" />} />
        <Route path="/login" element={<Login onLogin={login} />} />
        <Route path="/" element={<Home />} />
      </Routes>

      <Footer>
        <em>Note app, made by me :)</em>
      </Footer>
    </Page>
  )
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <Router>
    <App />
  </Router>
)