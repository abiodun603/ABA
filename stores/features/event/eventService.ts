import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../configs/authConfig'
import type { EventResponse } from '../../models/events.model'


export interface SaveEventRequest {
  event: string
}

export const eventsApi = createApi({
  baseQuery,
  reducerPath: 'eventsApi',
  endpoints: (builder) => ({
    getEvents: builder.query<EventResponse, void>({
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
    }),
    getSavedEvent: builder.query<EventResponse, void>({
      query: () => ({ 
        url: "/saves/event",
        method: 'GET',
      })
    }),
    saveEvent: builder.mutation<void, SaveEventRequest>({
      query: (credentials) => ({ 
        url: `/saves`,
        method: 'POST',
        body: credentials
      })
    })
  })
})

export const { useGetEventsQuery, useGetEventQuery, useGetSavedEventQuery, useSaveEventMutation } = eventsApi
