import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Routes, Route, Link, useMatch } from 'react-router-dom'

import Notification from './components/Notification'
import LogoutForm from './components/LogoutForm'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import BlogsByUser from './components/BlogsByUser'

import { tryLoginFromCache } from './reducers/loginReducer'
import { initializeBlogs } from './reducers/blogReducer'
import { loadUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(tryLoginFromCache())
    dispatch(initializeBlogs())
    dispatch(loadUsers())
  }, [dispatch])

  const users = useSelector((state) => state.users)

  const match = useMatch('/users/:id')
  const user = match ? users.find((user) => user.id === match.params.id) : null

  const padding = {
    padding: 5,
  }

  return (
    <div>
      <div>
        <Link style={padding} to={'/'}>
          Home
        </Link>
        <Link style={padding} to={'/users'}>
          Users
        </Link>
      </div>

      <Notification />

      <LoginForm />
      <LogoutForm />

      <Routes>
        <Route
          path="/"
          element={
            <div>
              <h2>Blogs</h2>
              <BlogForm />
            </div>
          }
        />
        <Route path="/users/:id" element={<BlogsByUser user={user} />} />
        <Route path="/users" element={<Users />} />
      </Routes>
    </div>
  )
}

export default App
