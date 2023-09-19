import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../configs/authConfig'

export const resourcesApi = createApi({
  baseQuery,
  reducerPath: 'resourcesApi',
  endpoints: (builder) => ({
    getResources: builder.query<any, void>({
      query: () => ({
        url: '/resources',
        method: 'GET',
      }),
    })
  })
})

export const { useGetResourcesQuery } = resourcesApi
