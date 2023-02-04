import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import Blog from './Blog'
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
      <Togglable buttonLabel="New blog" ref={blogCreationFormRef}>
        <BlogCreationForm createBlog={createBlog} />
      </Togglable>
      <br />
      {blogsByLikes.map((blog) => (
        <Blog key={blog.id} blog={blog} />
      ))}
    </div>
  )
}

export default BlogForm
