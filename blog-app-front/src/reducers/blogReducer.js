import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

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
    const newBlog = await blogService.create(blog)
    dispatch(appendBlog(newBlog))

    dispatch(
      setNotification(
        `Added new blog ${blog.title} by ${blog.author}`,
        'green',
        5
      )
    )
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

    dispatch(setNotification(`Liked blog ${blogObject.title}`, 'yellow', 5))
  }
}

export const deleteBlog = (blog) => {
  return async (dispatch) => {
    const id = blog.id
    const _response = await blogService.deleteBlog(id)
    dispatch(removeBlog(blog))

    dispatch(setNotification(`Deleted blog ${blog.title}`, 'yellow', 5))
  }
}

export const { appendBlog, setBlogs, updateBlog, removeBlog } =
  blogsSlice.actions
export default blogsSlice.reducer
