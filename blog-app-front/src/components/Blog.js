import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { deleteBlog, likeBlog } from '../reducers/blogReducer'

const Blog = ({ blog }) => {
  const [visible, setVisible] = useState(false)

  const dispatch = useDispatch()

  const user = useSelector((state) => state.user)

  const hideWhenVisible = { display: visible ? 'none' : '' }
  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
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

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5,
  }

  const BlogSummary = (props) => (
    <div>
      {blog.title} {blog.author} {props.children}
    </div>
  )

  const BlogExpanded = (props) => {
    const userCanRemove =
      blog.user !== undefined && user.username === blog.user.username

    const removeButton = userCanRemove ? (
      <div>
        <br />
        <button onClick={handleRemove}>Remove</button>
      </div>
    ) : (
      <div></div>
    )

    return (
      <div>
        {blog.title} {blog.author} {props.children}
        <br />
        {blog.url}
        <br />
        likes {blog.likes} <button onClick={handleLike}>Like</button>
        <br />
        {blog.user !== undefined && blog.user.name}
        {removeButton}
      </div>
    )
  }

  return (
    <div style={blogStyle}>
      <div style={hideWhenVisible} className="blogSummary">
        <BlogSummary>
          <button onClick={toggleVisibility}>View</button>
        </BlogSummary>
      </div>
      <div style={showWhenVisible} className="blogExpanded">
        <BlogExpanded>
          <button onClick={toggleVisibility}>Hide</button>
        </BlogExpanded>
      </div>
    </div>
  )
}

export default Blog
