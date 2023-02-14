import { useSelector } from 'react-redux'
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

const Users = () => {
  const users = useSelector((state) => state.users)

  const usersSorted = [...users].sort((a, b) => {
    a.blogs.length - b.blogs.length
  })

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table className="styled-table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Blogs created</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {usersSorted.map((user) => (
              <TableRow key={user.id}>
                <TableCell>
                  <Link to={`/users/${user.id}`}>{user.name}</Link>
                </TableCell>
                <TableCell>{user.blogs.length}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default Users
