// store.js
import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './features/auth/authService';
import authReducer from './features/auth/authSlice'
import eventReducer from './features/event/eventSlice'
import contactReducer from './features/contacts/contactSlice'
import chatMemberReducer from './features/chatMember/chatMemberDetail'
import tabReducer from './tab/tabReducer';
import { eventsApi } from './features/event/eventService';
import { resourcesApi } from './features/resources/resourcesService';
import { profileApi } from './features/profile/profileService';
import { groupsApi } from './features/groups/groupsService';
import { usersApi } from './features/users/UsersService'

const store = configureStore({
  reducer: {
      event: eventReducer,
      [authApi.reducerPath]: authApi.reducer,
      [profileApi.reducerPath]: profileApi.reducer,
      [eventsApi.reducerPath]: eventsApi.reducer, 
      [resourcesApi.reducerPath]: resourcesApi.reducer,   
      [groupsApi.reducerPath]: groupsApi.reducer,
      [usersApi.reducerPath]: usersApi.reducer,
      contact: contactReducer,
      chatMember: chatMemberReducer,
      auth: authReducer,
      tabReducer: tabReducer,
  },
  middleware: (getDefaultMiddleware) => {
    const authApiMiddleware = authApi.middleware;
    const eventsApiMiddleware = eventsApi.middleware;
    const resourcesApiMiddleware = resourcesApi.middleware;
    const profileApiMiddleware = profileApi.middleware;
    const groupsApiMiddleware = groupsApi.middleware;
    const usersApiMiddleware = usersApi.middleware;
    return getDefaultMiddleware()
      .concat(authApiMiddleware)
      .concat(eventsApiMiddleware)
      .concat(resourcesApiMiddleware)
      .concat(profileApiMiddleware)
      .concat(groupsApiMiddleware)
      .concat(usersApiMiddleware)
  },
});

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export default store;
