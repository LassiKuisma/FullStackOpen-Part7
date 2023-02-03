import { useDispatch } from 'react-redux'
import { useEffect } from 'react'
import Notification from './components/Notification'
import UserForm from './components/UserForm'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'

import { setUser } from './reducers/userReducer'
import blogService from './services/blogs'
import { initializeBlogs } from './reducers/blogReducer'
import Users from './components/Users'
import { loadUsers } from './reducers/usersReducer'

const App = () => {
  const dispatch = useDispatch()

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }, [])

  useEffect(() => {
    dispatch(initializeBlogs())
    dispatch(loadUsers())
  }, [dispatch])

  return (
    <div>
      <Notification />
      <LoginForm />
      <h2>Blogs</h2>
      <UserForm />
      <BlogForm />
      <Users />
    </div>
  )
}

export default App
