import { configureStore } from '@reduxjs/toolkit'
import loginReducer from './reducers/loginReducer'
import notificationReducer from './reducers/notificationReducer'
import blogReducer from './reducers/blogReducer'
import usersReducer from './reducers/usersReducer'

const createStore = () => {
  return configureStore({
    reducer: {
      notification: notificationReducer,
      login: loginReducer,
      blogs: blogReducer,
      users: usersReducer,
    },
  })
}

export default createStore
