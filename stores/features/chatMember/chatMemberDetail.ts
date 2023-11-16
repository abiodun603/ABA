import { createSlice, PayloadAction } from '@reduxjs/toolkit';


interface IContactState {
  chatId: string | null
  email: string | null
  memberId: string | null
}

const initialState  = {
  chatId: null,
  email: null,
  memberId: null,
} as IContactState;

const chatMemberSlice = createSlice({
  name: 'chatMember',
  initialState,
  reducers: {
    setMemberEmailAndID: (state, {payload}) => {
      state.email = payload.email;
      state.memberId = payload.id;
      state.chatId = payload.chatId;
    }
  },
});

export const {  setMemberEmailAndID } = chatMemberSlice.actions;

export default chatMemberSlice.reducer;