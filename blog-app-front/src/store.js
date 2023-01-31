import { configureStore } from '@reduxjs/toolkit'
import userReducer from './reducers/userReducer'
import notificationReducer from './reducers/notificationReducer'

const createStore = () => {
  return configureStore({
    reducer: {
      notification: notificationReducer,
      user: userReducer,
    },
  })
}

export default createStore
