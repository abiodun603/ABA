import { createSlice } from '@reduxjs/toolkit'
// import { api, User } from '../../app/services/auth'
import type { RootState } from '../../store'

type EventState = {
  location: string
  cords: any
}

const eventSlice = createSlice({
  name: 'location',
  initialState: { location: "" } as EventState,
  reducers: {
    setEventLocation: (state, action) => {
      const { location, cords } = action.payload;
      state.location = location;
      state.cords = cords
    }
  }
})

export const { setEventLocation } = eventSlice.actions;
export const getCurrentEventLocation = (state: RootState) => state.event.location
export default eventSlice.reducer
