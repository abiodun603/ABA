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
    }),
    getSavedResources: builder.query<any, void>({
      query: () => ({ 
        url: "/saves/resource",
        method: 'GET',
      })
    }),
    saveResource: builder.mutation<void, any>({
      query: (credentials) => ({ 
        url: `/saves`,
        method: 'POST',
        body: credentials
      })
    })
  })
})

export const { useGetResourcesQuery, useGetSavedResourcesQuery, useSaveResourceMutation } = resourcesApi
