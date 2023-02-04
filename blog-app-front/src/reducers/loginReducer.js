import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = null

const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    setUser(_state, action) {
      return action.payload
    },
    clearUser(_state, _action) {
      return null
    },
  },
})

export const tryLogin = (username, password) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      dispatch(setUser(user))
      dispatch(setNotification(`Welcome ${user.name}`, 'green', 5))
    } catch (exception) {
      dispatch(setNotification('Wrong username or password', 'red', 5))
    }
  }
}

export const tryLoginFromCache = () => {
  return async (dispatch) => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      dispatch(setUser(user))
      blogService.setToken(user.token)
    }
  }
}

export const logOut = () => {
  return async (dispatch) => {
    window.localStorage.removeItem('loggedBlogappUser')
    blogService.setToken(null)

    dispatch(setUser(null))
  }
}

export const { setUser, clearUser } = loginSlice.actions
export default loginSlice.reducer
