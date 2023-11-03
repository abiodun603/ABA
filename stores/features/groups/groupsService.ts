import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../configs/authConfig'
import type { EventResponse } from '../../models/events.model'
import { GroupsResponse } from '../../models/groups.mdel'


export interface SaveEventRequest {
  event: string
}

export const groupsApi = createApi({
  baseQuery,
  reducerPath: 'groupsApi',
  endpoints: (builder) => ({
    getCommunity: builder.query<GroupsResponse, void>({
      query: () => ({
        url: '/community',
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
      })
    }),
    getSavedEvent: builder.query<EventResponse, void>({
      query: () => ({ 
        url: "/saves/event",
        method: 'GET',
      })
    }),
    joinCommunity: builder.mutation<void, SaveEventRequest>({
      query: (credentials) => ({ 
        url: `/saves`,
        method: 'POST',
        body: credentials
      })
    })
  })
})

export const { useGetCommunityQuery, useGetNextEventQuery, useGetEventDetailsQuery, useGetSavedEventQuery, useJoinCommunityMutation } = groupsApi
