import { createApi } from '@reduxjs/toolkit/query/react'
import { baseQuery } from '../../../configs/authConfig'
import type { EventResponse } from '../../models/events.model'
import { AddGroupAdminRequest, GroupRequest, GroupsDetailsResponse, GroupsResponse } from '../../models/groups.mdel'


export interface SaveEventRequest {
  event: string
}

interface GetOneCommunityRequest {
  community_id: any
}

type ResourceRequest = {
  community_id: string;
  media_type: string
}

export const groupsApi = createApi({
  baseQuery,
  reducerPath: 'groupsApi',
  tagTypes: ["Community", "MyCommunity", "Members"],
  endpoints: (builder) => ({
    getCommunity: builder.query<GroupsResponse, void>({
      query: () => ({
        url: '/community',
        method: 'GET',
      }),
      providesTags: ["Community"],
    }),
    deleteCommunity: builder.mutation<any, string>({
      query: (id) => ({ 
        url: `/community/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ["Community"]
    }),
    getMyCommunity: builder.query<EventResponse, void>({
      query: () => ({ 
        url: `/community/me`,
        method: 'GET',
      }),
      providesTags: ["MyCommunity"],
    }),
    getCommunityEvent: builder.query<EventResponse, string>({
      query: (id) => ({ 
        url: `/community/events/${id}`,
        method: 'GET',
      }),
      providesTags: ["MyCommunity"],
    }),
    updateMyCommunity: builder.mutation<void, Partial<GroupRequest> & Pick<GroupRequest, 'id'>>({
      query: ({id, ...patch}) => ({
        url: `/community/${id}`,
        method: 'PATCH',
        body: patch
      }),
      invalidatesTags: ["MyCommunity"]
    }),
    getJoinedCommunity: builder.query<any, string>({
      query: (id) => ({ 
        url: `/community/isMember/${id}`,
        method: 'GET',
      }),
      providesTags: ["Community", "MyCommunity"]
    }),
    getCommunityMembers: builder.query<any, string>({
      query: (id) => ({ 
        url: `/community/members/${id}`,
        method: 'GET',
      }),
      providesTags: ["Members"]
    }),
    addCommunityAdmin: builder.mutation<void, AddGroupAdminRequest>({
      query: (credentials) => ({ 
        url: `/community/addAdmin`,
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ["Members"]
    }),  
    getCategory: builder.query<GroupsResponse, void>({
      query: () => ({
        url: '/category',
        method: 'GET',
      }),
      providesTags: ["Community"],
    }),
    getCategoryById: builder.query<GroupsResponse, any>({
      query: (id) => ({
        url: `/community/${id}`,
        method: 'GET',
      }),
      providesTags: ["Community"],
    }),
    createCommunity: builder.mutation<void, GroupRequest>({
      query: (credentials) => ({ 
        url: `/community`,
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ["Community"]
    }),  
    leaveCommunity: builder.mutation<void, GetOneCommunityRequest>({
      query: (credentials) => ({ 
        url: `/community/leave`,
        method: 'POST',
        body: credentials
      }),
      invalidatesTags: ["Community"]
    }), 
    getOneCommunity: builder.query<GroupsDetailsResponse, string>({
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
      }),
      providesTags: ["Community"],
    }),
    getPastEvent: builder.query<EventResponse, void>({
      query: () => ({ 
        url: "/events/past",
        method: 'GET',
      }),
      providesTags: ["Community"],
    }),
    
    joinCommunity: builder.mutation<any, GetOneCommunityRequest>({
      query: (credentials) => ({
          url: `/community/join`,
          method: 'POST',
          body: credentials
      }),
      invalidatesTags: ["MyCommunity"]
    }),
    getCommunityResources: builder.query<EventResponse, void>({
      query: () => ({ 
        url: "/resources",
        method: 'GET',
      }),
    }),
    getCommunityImages:  builder.query<any, ResourceRequest>({
      query: ({community_id, media_type}) => ({ 
        url: `/resources/resourcesByCommunityId/${community_id}/${media_type}`,
        method: 'GET',
      }),
    }),
    getCommunityFile:  builder.query<any, ResourceRequest>({
      query: ({community_id, media_type}) => ({ 
        url: `/resources/resourcesByCommunityId/${community_id}/${media_type}`,
        method: 'GET',
      }),
    }),
  })
})

export const {useGetCommunityMembersQuery, useGetCommunityFileQuery, useGetCommunityImagesQuery, useGetCommunityResourcesQuery, useGetCommunityEventQuery, useAddCommunityAdminMutation, useUpdateMyCommunityMutation, useDeleteCommunityMutation,  useGetCategoryByIdQuery, useGetCategoryQuery, useGetCommunityQuery, useGetOneCommunityQuery, useGetMyCommunityQuery, useGetEventDetailsQuery, useGetSavedEventQuery, useJoinCommunityMutation, useCreateCommunityMutation, useLeaveCommunityMutation, useGetPastEventQuery, useGetJoinedCommunityQuery } = groupsApi
