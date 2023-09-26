import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type IContactid = {
  id: string
  email: string;
}

type IFormData = {
  id: string
  contact_id: IContactid;
}

interface IContactState {
  docs: IFormData[];
}

const initialState  = {
  docs: [],
} as IContactState;

const contactsSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setGetData: (state, action: PayloadAction<IContactState>) => {
      console.log(action.payload)
      state.docs = action.payload.docs;
    }
  },
});

export const { setGetData } = contactsSlice.actions;

export default contactsSlice.reducer;