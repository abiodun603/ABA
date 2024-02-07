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
  tagTypes: ["Event", "SaveEvent", "MyEvents"],
  endpoints: (builder) => ({
    getEvents: builder.query<EventResponse, void>({
      query: () => ({
        url: '/events',
        method: 'GET',
      }),
      providesTags: ["Event", "SaveEvent"]
    }),
    getGoingEvents: builder.query<EventResponse, void>({
      query: () => ({
        url: '/events/participatingEvents',
        method: 'GET',
      }),
      providesTags: ["Event", "SaveEvent", "MyEvents"],
    }),
    getMyEvents: builder.query<EventResponse, void>({
      query: () => ({ 
        url: `/events/me`,
        method: 'GET',
      }),
      providesTags: ["MyEvents", "SaveEvent"],
    }),
    getPopularEvents: builder.query<EventResponse, void>({
      query: () => ({
        url: '/events/popular',
        method: 'GET',
      })
    }),
    getEventsByCatType: builder.query<EventResponse, void>({
      query: () => ({
        url: '/events/sortByEventType',
        method: 'GET',
      })
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
    getEventById: builder.query<EventResponse, string>({
      query: (id) => ({ 
        url: `/events/${id}`,
        method: 'GET',
      }),
      providesTags: ["Event"]
    }),
    getSavedEvent: builder.query<EventResponse, string>({
      query: (id) => ({ 
        url: `/events/isSaved/${id}`,
        method: 'GET',
      }),
      providesTags: ["SaveEvent"]
    }),
    getJoinedEvent: builder.query<any, void>({
      query: (id) => ({ 
        url: `/events/getJoinedEventBoolean/${id}`,
        method: 'GET',
      }),
      providesTags: ["Event"]
    }),
    getUpcomingEvents: builder.query<any, string>({
      query: (id) => ({
        url: `/events/upcoming/${id}`,
        method: 'GET',
      })
    }),
    getSortUpcomingEvent: builder.query<any, string>({
      query: (date) => ({ 
        url: `/events/sort?date=${date}`,
        method: 'GET',
      }),
    }),
    createEvent: builder.mutation<void, EventRequest>({
      query: (credentials) => ({ 
        url: `/events`,
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ["Event"]
    }), 
    updateEvent: builder.mutation<void, Partial<EventRequest> & Pick<EventRequest, 'id'>>({
      query: ({id, ...patch}) => ({
        url: `/events/${id}`,
        method: 'PATCH',
        body: patch
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
        url: `/events/save`,
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ["SaveEvent", "Event"]
    }),
    unSaveEvent: builder.mutation<void, any>({
      query: (id) => ({ 
        url: `/events/unsave/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["SaveEvent", "Event"]
    }),
    deleteEvent: builder.mutation<any, string>({
      query: (id) => ({ 
        url: `/event/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["MyEvents"]
    }),
  })
})

export const {useGetSortUpcomingEventQuery,useGetGoingEventsQuery,useGetUpcomingEventsQuery,  useGetMyEventsQuery, useDeleteEventMutation, useGetEventsQuery, useGetEventsByCatTypeQuery, useGetPopularEventsQuery, useLazyGetSortUpcomingEventQuery, useUnSaveEventMutation, useGetNextEventQuery, useUpdateAttendEventMutation, useGetEventByIdQuery, useGetJoinedEventQuery, useGetSavedEventQuery, useSaveEventMutation, useGetEventTypesQuery, useCreateEventMutation, useLeaveEventMutation, useUpdateEventMutation} = eventsApi
