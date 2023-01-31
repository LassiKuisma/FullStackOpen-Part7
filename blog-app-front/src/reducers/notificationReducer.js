import { createSlice } from '@reduxjs/toolkit'

const initialState = {
  message: null,
  type: null,
  timer: null,
}

const notificationSlice = createSlice({
  name: 'notification',
  initialState,
  reducers: {
    setMessage(state, action) {
      const { message, type } = action.payload
      state.message = message
      state.type = type
    },
    clearMessage(state, _action) {
      state.message = null
      state.type = null
    },
    setTimer(state, action) {
      state.timer = action.payload
    },
    clearTimer(state, _action) {
      const timer = state.timer
      if (timer !== null) {
        clearTimeout(timer)
      }
    },
  },
})

export const setNotification = (message, type, duration) => {
  return async (dispatch) => {
    // TODO: set notification type
    dispatch(setMessage({ message, type }))
    dispatch(clearTimer())

    const timer = setTimeout(() => {
      dispatch(clearMessage())
    }, duration * 1000)

    dispatch(setTimer(timer))
  }
}

export const { setMessage, clearMessage, setTimer, clearTimer } =
  notificationSlice.actions
export default notificationSlice.reducer
