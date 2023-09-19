import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../configs/authConfig'
import type { EventResponse } from '../../models/events.model'


export const eventsApi = createApi({
  baseQuery,
  reducerPath: 'eventsApi',
  endpoints: (builder) => ({
    getEvents: builder.query<any, void>({
      query: () => ({
        url: '/events',
        method: 'GET',
      }),
    }),
    getEvent: builder.query<EventResponse, string>({
      query: (id) => ({ 
        url: `/events/${id}`,
        method: 'GET',
      })
    })
  })
})

export const { useGetEventsQuery, useGetEventQuery } = eventsApi
