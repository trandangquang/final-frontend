import { createSlice } from '@reduxjs/toolkit';
import appApi from '../services/appApi';

const initialState = null;

export const userSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
     logout: () => initialState
  },
  extraReducers: (builder) => {
    builder.addMatcher(
      appApi.endpoints.register.matchFulfilled,(_, { payload }) => payload
    );
    builder.addMatcher(
      appApi.endpoints.login.matchFulfilled,(_, { payload }) => payload
    );
  },
});


export const {logout} = userSlice.actions
export default userSlice.reducer;
