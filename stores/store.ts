// store.js
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './features/auth/authService';
import authReducer from './features/auth/authSlice'
import tabReducer from './tab/tabReducer';
import { eventsApi } from './features/event/eventService';
import { resourcesApi } from './features/resources/resourcesService';

const store = configureStore({
  reducer: {
     [authApi.reducerPath]: authApi.reducer,
     [eventsApi.reducerPath]: eventsApi.reducer, 
     [resourcesApi.reducerPath]: resourcesApi.reducer,    
     auth: authReducer,
     tabReducer: tabReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const authApiMiddleware = authApi.middleware;
    const eventsApiMiddleware = eventsApi.middleware;
    const resourcesApiMiddleware = resourcesApi.middleware;
    return getDefaultMiddleware()
      .concat(authApiMiddleware)
      .concat(eventsApiMiddleware)
      .concat(resourcesApiMiddleware);
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
