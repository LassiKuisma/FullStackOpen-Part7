import { useState, useEffect, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './Blog'
import Togglable from './Togglable'
import BlogCreationForm from './BlogCreationForm'

import { setNotification } from '../reducers/notificationReducer'
import blogService from '../services/blogs'

const BlogForm = () => {
  const dispatch = useDispatch()

  const blogCreationFormRef = useRef()
  const [blogs, setBlogs] = useState([])

  useEffect(() => {
    blogService.getAll().then((blogs) => setBlogs(blogs))
  }, [])

  const user = useSelector((state) => state.user.user)
  if (user === null) {
    return <div></div>
  }

  const showNotification = (message, type) => {
    dispatch(setNotification(message, type, 5))
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

  const blogsByLikes = blogs.sort((a, b) =>
    a.likes === b.likes ? 0 : a.likes > b.likes ? -1 : 1
  )

  return (
    <div>
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
}

export default BlogForm
