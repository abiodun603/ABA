import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../configs/authConfig'
import type { EventRequest, EventResponse } from '../../models/events.model'


export interface SaveEventRequest {
  event_id: string
}

interface AttendEventRequest {
  eventId: any
}


export const eventsApi = createApi({
  baseQuery,
  reducerPath: 'eventsApi',
  tagTypes: ["Event"],
  endpoints: (builder) => ({
    getEvents: builder.query<EventResponse, void>({
      query: () => ({
        url: '/events',
        method: 'GET',
      }),
      providesTags: ["Event"]
    }),
    getEventTypes: builder.query<EventResponse, void>({
      query: () => ({
        url: '/eventTypes',
        method: 'GET',
      }),
    }),
    getNextEvent: builder.query<EventResponse, any>({
      query: (location) => ({ 
        url: `/events/nextevent/${location}`,
        method: 'GET',
      })
    }),
    getEventDetails: builder.query<EventResponse, string>({
      query: (id) => ({ 
        url: `/events/${id}`,
        method: 'GET',
      }),
      providesTags: ["Event"]
    }),
    getSavedEvent: builder.query<EventResponse, void>({
      query: () => ({ 
        url: "/events/save",
        method: 'GET',
      })
    }),
    getJoinedEvent: builder.query<any, void>({
      query: (id) => ({ 
        url: `/events/getJoinedEventBoolean/${id}`,
        method: 'GET',
      }),
      providesTags: ["Event"]
    }),
    createEvent: builder.mutation<void, EventRequest>({
      query: (credentials) => ({ 
        url: `/events`,
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ["Event"]
    }), 
    updateAttendEvent: builder.mutation<void, AttendEventRequest>({
      query: (eventId) => ({
        url: `/events/attend/${eventId}`,
        method: 'PATCH',
      }),
      invalidatesTags: ["Event"]
    }),
    leaveEvent: builder.mutation<void, number>({
      query: (id) => ({
        url: `/events/leave/${id}`,
        method: 'PATCH',
      }),
      invalidatesTags: ["Event"]
    }),
    saveEvent: builder.mutation<void, SaveEventRequest>({
      query: (credentials) => ({ 
        url: `/saves`,
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ["Event"]
    }),
    unSaveEvent: builder.mutation<void, any>({
      query: (id) => ({ 
        url: `/events/unsave/${id}`,
        method: 'DELETE',
      })
    })
  })
})

export const { useGetEventsQuery, useUnSaveEventMutation, useGetNextEventQuery, useUpdateAttendEventMutation, useGetEventDetailsQuery, useGetJoinedEventQuery, useGetSavedEventQuery, useSaveEventMutation, useGetEventTypesQuery, useCreateEventMutation, useLeaveEventMutation} = eventsApi
