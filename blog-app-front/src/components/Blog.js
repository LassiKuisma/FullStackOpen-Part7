import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const dispatch = useDispatch()

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
        <button onClick={handleRemove}>Remove</button>
      </div>
    )
  }

  const likeButton = () =>
    isLoggedIn ? <button onClick={handleLike}>Like</button> : <></>

  return (
    <div>
      <h2>
        {blog.title} {blog.author}
      </h2>
      <a href={blog.url}>{blog.url}</a>
      <div>
        {blog.likes} likes {likeButton()}
      </div>
      <div>Added by {blog.user.name}</div>
      {removeButton()}
    </div>
  )
}

export default Blog
