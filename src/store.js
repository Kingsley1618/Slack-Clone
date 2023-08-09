import { createSlice, configureStore } from '@reduxjs/toolkit';
const initialState = {
  id: 'Hl44SLCdpzX8MTgKUylY',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    selectId(state, action) {
      state.id = action.payload.id;
      console.log(state.id);
    },
  },
});
export const UserActions = userSlice.actions;
export const store = configureStore({
  reducer: userSlice.reducer,
});
