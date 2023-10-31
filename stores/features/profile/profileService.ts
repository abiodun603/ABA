import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../configs/authConfig'
import type { EventResponse } from '../../models/events.model'
import { ProfileResponse } from '../../models/profile.model'


export const profileApi = createApi({
  baseQuery,
  reducerPath: 'profileApi',
  endpoints: (builder) => ({
    getProfileMe: builder.query<ProfileResponse, void>({
      query: () => ({
        url: '/users/me',
        method: 'GET',
      }),
    })
  })
})

export const { useGetProfileMeQuery } = profileApi
