import { createSlice } from '@reduxjs/toolkit'
// import { api, User } from '../../app/services/auth'
import type { RootState } from '../../store'
import { User, authApi } from './authService'

type AuthState = {
  user: User | null
  token: string | null
}

const slice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token
        state.user = payload.user
      }
    )
  },
})

export default slice.reducer
export const selectCurrentUser = (state: RootState) => state.auth.user
