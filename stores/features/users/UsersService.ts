import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../configs/authConfig'
import type { EventResponse } from '../../models/events.model'
import { ProfileResponse } from '../../models/profile.model'


export const usersApi = createApi({
  baseQuery,
  reducerPath: 'usersApi',
  endpoints: (builder) => ({
    getUsers: builder.query<ProfileResponse, void>({
      query: () => ({
        url: '/users',
        method: 'GET',
      }),
    })
  })
})

export const { useGetUsersQuery } = usersApi
