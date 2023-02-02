import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'

const createStore = () => {
  return configureStore({
    reducer: {
      notification: notificationReducer,
      user: userReducer,
      blogs: blogReducer,
    },
  })
}

export default createStore
