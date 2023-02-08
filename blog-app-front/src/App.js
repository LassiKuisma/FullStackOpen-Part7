import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { Routes, Route, useMatch } from 'react-router-dom'

import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import BlogsByUser from './components/BlogsByUser'
import Blog from './components/Blog'
import Navigation from './components/Navigation'

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
  const userMatch = useMatch('/users/:id')
  const user = userMatch
    ? users.find((user) => user.id === userMatch.params.id)
    : null

  const blogs = useSelector((state) => state.blogs)
  const blogMatch = useMatch('/blogs/:id')
  const blog = blogMatch
    ? blogs.find((blog) => blog.id === blogMatch.params.id)
    : null

  return (
    <div>
      <Navigation />
      <Notification />

      <LoginForm />

      <Routes>
        <Route path="/" element={<BlogForm />} />
        <Route path="/users/:id" element={<BlogsByUser user={user} />} />
        <Route path="/users" element={<Users />} />
        <Route path="/blogs/:id" element={<Blog blog={blog} />} />
      </Routes>
    </div>
  )
}

export default App
