import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: 'https://api.example.com' }), // Replace with your API base URL
  endpoints: (builder) => ({
    // Define your API endpoints here
    // Example:
    getTodos: builder.query({
      query: () => 'todos', // Relative API endpoint
    }),
  }),
});

export const { useGetTodosQuery } = api;