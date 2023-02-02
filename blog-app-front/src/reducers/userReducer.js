import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'
import { setNotification } from './notificationReducer'

const initialState = {}

const userSlice = createSlice({
  name: 'user',
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

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
