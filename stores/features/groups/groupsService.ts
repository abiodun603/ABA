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
    getMyCommunity: builder.query<EventResponse, void>({
      query: () => ({ 
        url: `/community/me`,
        method: 'GET',
      })
    }),
    getOneCommunity: builder.query<GroupsResponse, string>({
      query: (id) => ({ 
        url: `/community/${id}`,
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
      query: (credentials) => {
        // Log the credentials to the console for debugging
        console.log('Join community credentials:', credentials);
    
        return {
          url: `/community/join`,
          method: 'POST',
          body: credentials
        };
      }
    })    
  })
})

export const { useGetCommunityQuery, useGetOneCommunityQuery, useGetMyCommunityQuery, useGetEventDetailsQuery, useGetSavedEventQuery, useJoinCommunityMutation } = groupsApi
