import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../configs/authConfig'

export interface User {
  id: string
  first_name: string
  last_name: string
  email: string
}

export interface UserResponse {
  user:   User
  token:  string
}

export interface LoginRequest {
  email:    string
  password: string
}

// ** Interface Types
export interface Profile {
  firstname:  string
  lastname:   string
  username:   string
  location:   string
  short_bio:  string
  roles:      string
}

export interface ProfileResponse {
  docs: Profile
  profile: Profile
}

export interface ProfileRequest {
  firstname: string
  username: string
}

export const authApi = createApi({
  baseQuery,
  endpoints: (builder) => ({
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    getProfile: builder.query<ProfileResponse, string>({
      query: (id) => ({
        url: `/personal_information/${id}`,
        method: 'GET'
      })
    }),
    updateProfile: builder.mutation<void, ProfileRequest>({
      query: (credentials) => ({
        url: `/personal_information`,
        method: 'PATCH',
        body: credentials,
      }),
    })
  }),
})

export const { useLoginMutation, useUpdateProfileMutation, useGetProfileQuery } = authApi