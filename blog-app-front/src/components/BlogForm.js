import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Togglable from './Togglable'
import BlogCreationForm from './BlogCreationForm'
import { addBlog } from '../reducers/blogReducer'

const BlogForm = () => {
  const blogCreationFormRef = useRef()

  const dispatch = useDispatch()

  const blogs = useSelector((state) => state.blogs)

  const user = useSelector((state) => state.login)
  if (user === null) {
    return <div></div>
  }

  const blogsByLikes = [...blogs].sort((a, b) =>
    a.likes === b.likes ? 0 : a.likes > b.likes ? -1 : 1
  )

  const createBlog = (blogObject) => {
    dispatch(addBlog(blogObject))

    blogCreationFormRef.current.toggleVisibility()
  }

  return (
    <div>
      <h2>Blogs</h2>
      <Togglable buttonLabel="New blog" ref={blogCreationFormRef}>
        <BlogCreationForm createBlog={createBlog} />
      </Togglable>
      <br />
      <ul>
        {blogsByLikes.map((blog) => (
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>
              {blog.title} {blog.author}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default BlogForm
