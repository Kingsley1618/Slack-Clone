import { createSlice, configureStore } from '@reduxjs/toolkit';
const initialState = {
  id: null,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers : {
    selectId(state,action) {
      state.id = action.payload.id
    }
  }
});
export const UserActions = userSlice.actions;
export const store = configureStore({
  reducer : userSlice.reducer
})
