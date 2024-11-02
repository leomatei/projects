import { createSlice } from '@reduxjs/toolkit';

const generalSlice = createSlice({
  name: 'general',
  initialState: { loading: false, successMessage: '', errorMessage: '' },
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSuccessMessage(state, action) {
      state.successMessage = action.payload;
    },
    setErrorMessage(state, action) {
      state.errorMessage = action.payload;
    },
  },
});
export const { setLoading, setSuccessMessage, setErrorMessage } =
  generalSlice.actions;
export default generalSlice.reducer;
