import { createSlice } from '@reduxjs/toolkit'
import loginService from '../services/login'
import blogService from '../services/blogs'

const initialState = {
  user: null,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      const user = action.payload
      state.user = user
    },
    clearUser(state, _action) {
      state.user = null
    },
  },
})

export const tryLogin = (username, password) => {
  return async (dispatch) => {
    console.log('logging in...')

    try {
      const user = await loginService.login({
        username,
        password,
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      blogService.setToken(user.token)

      console.log('succesfully logged in')
      dispatch(setUser(user))
    } catch (exception) {
      console.error('Failed to log in!')
      //setNotification('Wrong username or password', 'red', 5)
    }
  }
}

export const { setUser, clearUser } = userSlice.actions
export default userSlice.reducer
