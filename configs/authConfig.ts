import {  fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { RootState } from '../stores/store';

export const baseQuery = fetchBaseQuery({
  baseUrl: `https://a16a-197-211-58-105.ngrok-free.app/api`,
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.token;
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    return headers;
  },
});
