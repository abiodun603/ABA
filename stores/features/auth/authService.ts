import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../configs/authConfig'

export interface User {
  id: string
  name: string
  firstname: string
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
  user: any
  profile: Profile
}

export interface forgetPasswordRequest {
  email: string
}

export interface resetPasswordRequest {
  password: string,
  otp: string
}


export interface ProfileRequest {
  firstname:  string
  username:   string
  id:         string
}

interface OtpRequest {
  otp?: string;
  email?: string;
}

export const authApi = createApi({
  baseQuery,
  tagTypes: ["Profile"],
  endpoints: (builder) => ({
    signup: builder.mutation<UserResponse, LoginRequest>(
    {
      query: (credentials) => ({
        url: '/users',
        method: 'POST',
        body: credentials,
      }),
    }),
    login: builder.mutation<UserResponse, LoginRequest>({
      query: (credentials) => ({
        url: '/users/login',
        method: 'POST',
        body: credentials,
      }),
    }),
    
    forgetPassword: builder.mutation<UserResponse, forgetPasswordRequest>({
      query: (credentials) => ({
        url: '/users/forgotPassword',
        method: 'POST',
        body: credentials,
      }),
    }),
    resetPassword: builder.mutation<UserResponse, resetPasswordRequest>({
      query: (credentials) => ({
        url: '/users/resetPassword',
        method: 'POST',
        body: credentials,
      }),
    }),
    otp: builder.mutation<any, OtpRequest>({
      query: (credentials) => ({
        url: `/users/verify/${credentials.email}`,
        method: 'POST',
        body: {otp: credentials.otp},
      }),
    }),
    otpForget: builder.mutation<any, OtpRequest>({
      query: (credentials) => ({
        url: `/users/verifyResetOTP`,
        method: 'POST',
        body: credentials,
      }),
    }),
    otpResend: builder.mutation<any, OtpRequest>({
      query: (credentials) => ({
        url: `/users/resend`,
        method: 'POST',
        body: credentials,
      }),
    }),
    getProfile: builder.query<ProfileResponse, string>({
      query: (id) => ({
        url: `/personal_information/${id}`,
        method: 'GET'
      }),
      providesTags: ["Profile"]
    }),
    getUsers: builder.query<ProfileResponse, void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
      providesTags: ["Profile"]
    }),
    getProfileMe: builder.query<ProfileResponse, void>({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
      providesTags: ["Profile"]
    }),
    updateProfile: builder.mutation<void, Partial<ProfileRequest> & Pick<ProfileRequest, 'id'>>({
      query: ({id, ...patch}) => ({
        url: `/users/${id}`,
        method: 'PATCH',
        body: patch,
      }),
      invalidatesTags: ["Profile"]
    })
  }),
})

export const { useOtpResendMutation, useGetProfileMeQuery, useOtpForgetMutation, useResetPasswordMutation, useForgetPasswordMutation, useLoginMutation, useOtpMutation, useSignupMutation, useGetUsersQuery,  useUpdateProfileMutation, useGetProfileQuery } = authApi
