import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'
import { loadUsers } from './usersReducer'

const initialState = []

const blogsSlice = createSlice({
  name: 'blogs',
  initialState,
  reducers: {
    appendBlog(state, action) {
      const blog = action.payload
      state.push(blog)
    },
    setBlogs(_state, action) {
      return action.payload
    },
    updateBlog(state, action) {
      const updated = action.payload
      return state.map((blog) => (blog.id === updated.id ? updated : blog))
    },
    removeBlog(state, action) {
      const removed = action.payload
      return state.filter((blog) => blog.id !== removed.id)
    },
    appendComment(state, action) {
      const blogId = action.payload.blog.id
      const comment = {
        text: action.payload.text,
        id: action.payload.id,
      }

      state.find((blog) => blog.id === blogId).comments.push(comment)
    },
  },
})

export const initializeBlogs = () => {
  return async (dispatch) => {
    const blogs = await blogService.getAll()
    dispatch(setBlogs(blogs))
  }
}

export const addBlog = (blog) => {
  return async (dispatch) => {
    try {
      const newBlog = await blogService.create(blog)

      dispatch(appendBlog(newBlog))

      // update user stats
      dispatch(loadUsers())

      dispatch(
        setNotification(
          `Added new blog ${blog.title} by ${blog.author}`,
          'green',
          5
        )
      )
    } catch (exception) {
      dispatch(setNotification('Failed to create blog', 'red', 5))
    }
  }
}

export const likeBlog = (blog) => {
  return async (dispatch) => {
    const id = blog.id
    const blogObject = {
      ...blog,
      likes: blog.likes + 1,
    }
    const updated = await blogService.update(id, blogObject)
    dispatch(updateBlog(updated))

    // update user stats
    dispatch(loadUsers())

    dispatch(setNotification(`Liked blog ${blogObject.title}`, 'yellow', 5))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    const id = blog.id
    const _response = await blogService.deleteBlog(id)
    dispatch(removeBlog(blog))

    // update user stats
    dispatch(loadUsers())

    dispatch(setNotification(`Deleted blog ${blog.title}`, 'yellow', 5))
  }
}

export const addComment = (blog, comment) => {
  return async (dispatch) => {
    const response = await blogService.postComment(blog.id, comment)
    dispatch(appendComment(response))

    dispatch(setNotification('Comment added', 'green', 5))
  }
}

export const { appendBlog, setBlogs, updateBlog, removeBlog, appendComment } =
  blogsSlice.actions
export default blogsSlice.reducer
