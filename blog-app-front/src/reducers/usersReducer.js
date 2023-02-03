import { createSlice } from '@reduxjs/toolkit'
import userService from '../services/users'

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(_state, action) {
      return action.payload
    },
  },
})

export const loadUsers = () => {
  return async (dispatch) => {
    const users = await userService.getUsers()
    dispatch(setUsers(users))
  }
}

export const { setUsers } = usersSlice.actions
export default usersSlice.reducer
