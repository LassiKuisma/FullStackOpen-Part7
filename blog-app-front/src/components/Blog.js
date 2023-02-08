import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { deleteBlog, likeBlog, addComment } from '../reducers/blogReducer'

import { Button, Stack } from '@mui/material'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const user = useSelector((state) => state.login)
  const isLoggedIn = user !== null && user !== undefined

  if (!blog) {
    return <div>Loading blog...</div>
  }

  const handleLike = () => {
    dispatch(likeBlog(blog))
  }

  const handleRemove = () => {
    const confirm = window.confirm(
      `Remove blog ${blog.title} by ${blog.author}?`
    )
    if (confirm) {
      dispatch(deleteBlog(blog))
      navigate('/')
    }
  }

  const removeButton = () => {
    // user doesn't have id locally, so I have to resort to comparing usernames
    const userCanRemove = isLoggedIn && user.username === blog.user.username

    return !userCanRemove ? (
      <></>
    ) : (
      <div>
        <br />
        <Button variant="outlined" color="error" onClick={handleRemove}>
          Remove
        </Button>
      </div>
    )
  }

  const likeButton = () =>
    isLoggedIn ? (
      <Button
        size="small"
        variant="contained"
        color="success"
        onClick={handleLike}
      >
        Like
      </Button>
    ) : (
      <></>
    )

  const handleAddComment = (event) => {
    event.preventDefault()

    const comment = {
      comment: event.target.comment.value,
    }

    dispatch(addComment(blog, comment))

    event.target.comment.value = ''
  }

  const commentSection = () => {
    if (!isLoggedIn) {
      return <></>
    }

    return (
      <div>
        <h3>Comments</h3>
        <form onSubmit={handleAddComment}>
          <input type="text" name="comment" />
          <button type="submit">Add comment</button>
        </form>
        <ul>
          {blog.comments.map((comment) => (
            <li key={comment.id}>{comment.text}</li>
          ))}
        </ul>
      </div>
    )
  }

  return (
    <div>
      <Stack spacing={1}>
        <div>
          <h1>{blog.title}</h1>
          <h2>by {blog.author}</h2>
        </div>
        <div>
          <a href={blog.url}>{blog.url}</a>
        </div>
        <div>
          {blog.likes} likes {likeButton()}
        </div>
        <div>Added by {blog.user.name}</div>
        {removeButton()}
      </Stack>
      {commentSection()}
    </div>
  )
}

export default Blog
