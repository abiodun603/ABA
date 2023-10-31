import { createSlice } from '@reduxjs/toolkit'
// import { api, User } from '../../app/services/auth'
import type { RootState } from '../../store'

type EventState = {
  location: string
}

const eventSlice = createSlice({
  name: 'eventSlice',
  initialState: { location: " " } as EventState,
  reducers: {
    setEventLocation: (state, action) => {
      const { location } = action.payload;
      state.location = location;
    },
  }
})

export default eventSlice.reducer
export const { setEventLocation } = eventSlice.actions;
export const getCurrentEventLocation = (state: RootState) => state.event.location
