import { Button, TextField } from '@mui/material'
import { useState } from 'react'

const BlogCreationForm = ({ createBlog }) => {
  const [blogTitle, setBlogTitle] = useState('')
  const [blogAuthor, setBlogAuthor] = useState('')
  const [blogUrl, setBlogUrl] = useState('')

  const handleBlogTitleChange = (event) => {
    setBlogTitle(event.target.value)
  }

  const handleBlogAuthorChange = (event) => {
    setBlogAuthor(event.target.value)
  }

  const handleBlogUrlChange = (event) => {
    setBlogUrl(event.target.value)
  }

  const handleSubmit = (event) => {
    event.preventDefault()

    const newBlog = {
      title: blogTitle,
      author: blogAuthor,
      url: blogUrl,
    }

    createBlog(newBlog)

    setBlogTitle('')
    setBlogAuthor('')
    setBlogUrl('')
  }

  const margins = {
    marginTop: '2px',
    marginBottom: '2px',
  }

  return (
    <div>
      <h2>Create new</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <TextField
            label="Title"
            value={blogTitle}
            onChange={handleBlogTitleChange}
            id="input-blog-title"
            size="small"
            style={margins}
          />
        </div>
        <div>
          <TextField
            label="Author"
            value={blogAuthor}
            onChange={handleBlogAuthorChange}
            id="input-blog-author"
            size="small"
            style={margins}
          />
        </div>
        <div>
          <TextField
            label="Url"
            value={blogUrl}
            onChange={handleBlogUrlChange}
            id="input-blog-url"
            size="small"
            style={margins}
          />
        </div>
        <Button
          id="create-blog"
          variant="contained"
          type="submit"
          style={margins}
        >
          Create
        </Button>
      </form>
    </div>
  )
}

export default BlogCreationForm
