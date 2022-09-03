import { createSlice } from '@reduxjs/toolkit';

const nativeCitySlice = createSlice({
  name: 'nativeCity',
  initialState: {
    nativeCity: '',
  },
  reducers: {
    setNativeCity(state, action) {
      state.nativeCity = action.payload;
    },
  }
});

export const {setNativeCity} = nativeCitySlice.actions;

export default nativeCitySlice.reducer;