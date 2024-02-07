import { createSlice } from '@reduxjs/toolkit'
// import { api, User } from '../../app/services/auth'
import type { RootState } from '../../store'
import { Profile, User, authApi } from './authService'

type AuthState = {
  user: User 
  token: string | null
  profile: Profile| null
}

const slice = createSlice({
  name: 'auth',
  initialState: { user: {}, token: null, profile: null } as AuthState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(
      authApi.endpoints.login.matchFulfilled,
      (state, { payload }) => {
        state.token = payload.token
        state.user = payload.user
      }
    ),
    builder.addMatcher(
      authApi.endpoints.getProfileMe.matchFulfilled,
      (state, { payload }) => {
        console.log(payload, "get my profile")
        state.profile = payload.user
      }
    )
  },
})

export default slice.reducer
export const selectCurrentUser = (state: RootState) => state.auth.user
