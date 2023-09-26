import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type IContactid = {
  id: string
  email: string;
}

// type IFormData = {
//   id: string
//   members: IContactid[];
// }

interface IContactState {
  id: string | null
  email: string | null
  contactId: string | null
  members: IContactid[];
}

const initialState  = {
  id: null,
  email: null,
  contactId: null,
  members: []
} as IContactState;

const findContactSlice = createSlice({
  name: 'contacts',
  initialState,
  reducers: {
    setFindContactData: (state, action: PayloadAction<IContactState>) => {
      console.log(action.payload)
      state.id = action.payload.id;
      state.members = action.payload.members;
    },
    setFindContactEmail: (state, {payload}) => {
      console.log(payload)
      state.email = payload;
    },
    setContactID: (state, {payload}) => {
      state.contactId = payload;
    }
  },
});

export const { setFindContactData, setFindContactEmail, setContactID } = findContactSlice.actions;

export default findContactSlice.reducer;