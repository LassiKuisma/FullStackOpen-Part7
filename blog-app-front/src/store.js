import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './reducers/notificationReducer'

const createStore = () => {
  return configureStore({
    reducer: {
      notification: notificationReducer,
    },
  })
}

export default createStore
