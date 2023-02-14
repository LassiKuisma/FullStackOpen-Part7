import { Link } from 'react-router-dom'

import {
  TableContainer,
  Paper,
  Table,
  TableBody,
  TableRow,
  TableCell,
  TableHead,
} from '@mui/material'

const BlogsByUser = ({ user }) => {
  if (!user) {
    return <div>Loading...</div>
  }

  return (
    <div>
      <h2>{user.name}</h2>
      <TableContainer component={Paper}>
        <Table className="styled-table">
          <TableHead>
            <TableRow>
              <TableCell>Added blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {user.blogs.map((blog) => (
              <TableRow key={blog.id}>
                <TableCell>
                  <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default BlogsByUser
