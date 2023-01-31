import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import Notification from './components/Notification'
import UserForm from './components/UserForm'
import Togglable from './components/Togglable'
import BlogCreationForm from './components/BlogCreationForm'

import { setNotification } from './reducers/notificationReducer'
import { useDispatch } from 'react-redux'
import LoginForm from './components/LoginForm'

const App = () => {
  const dispatch = useDispatch()

  const [blogs, setBlogs] = useState([])

  const [user, setUser] = useState(null)

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const showNotification = (message, type) => {
    dispatch(setNotification(message, type, 5))
  }

  const handleLogout = async (event) => {
    event.preventDefault()

    console.log('logging out')

    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)

    setUser(null)
    //setUsername('')
    //setPassword('')
  }

  const addBlog = async (blogObject) => {
    blogCreationFormRef.current.toggleVisibility()
    const created = await blogService.create(blogObject)
    setBlogs(blogs.concat(created))
    showNotification(
      `Added new blog ${created.title} by ${created.author}`,
      'green'
    )
  }

  const updateBlog = async (blogId, blogObject) => {
    const updated = await blogService.update(blogId, blogObject)
    setBlogs(blogs.map((blog) => (blog.id === blogId ? updated : blog)))
    showNotification(`Liked blog ${blogObject.title}`, 'yellow')
  }

  const deleteBlog = async (blogId) => {
    const _response = await blogService.deleteBlog(blogId)
    setBlogs(blogs.filter((blog) => blog.id !== blogId))
    showNotification('Blog deleted', 'yellow')
  }

  // displays user name, and log-out button
  const userForm = () => <UserForm user={user} handleLogout={handleLogout} />

  const blogCreationFormRef = useRef()

  const blogsByLikes = blogs.sort((a, b) =>
    a.likes === b.likes ? 0 : a.likes > b.likes ? -1 : 1
  )

  const blogForm = () => (
    <div>
      <h2>Blogs</h2>
      {user !== null && userForm()}
      <Togglable buttonLabel="New blog" ref={blogCreationFormRef}>
        <BlogCreationForm createBlog={addBlog} />
      </Togglable>
      <br />
      {blogsByLikes.map((blog) => (
        <Blog
          key={blog.id}
          blog={blog}
          updateBlog={updateBlog}
          deleteBlog={deleteBlog}
          user={user}
        />
      ))}
    </div>
  )

  return (
    <div>
      <Notification />
      <LoginForm />
      {blogForm()}
    </div>
  )
}

export default App
