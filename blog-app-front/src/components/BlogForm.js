import { useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

import Togglable from './Togglable'
import BlogCreationForm from './BlogCreationForm'
import { addBlog } from '../reducers/blogReducer'

import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@mui/material'

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
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Blog title</TableCell>
              <TableCell>Author</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {blogsByLikes.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
                <TableCell>{blog.author}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogForm
