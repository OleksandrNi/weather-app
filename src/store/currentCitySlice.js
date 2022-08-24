import { createSlice } from '@reduxjs/toolkit';

const currentCitySlice = createSlice({
  name: 'currentCity',
  initialState: {
    currentCity: '',
  },
  reducers: {
    addCurrentCity(state, action) {
      state.currentCity = action.payload;
    },
    callCityFromHistory(state, action) {
      state.currentCity = action.payload;
    }
  }
});

export const {addCurrentCity, callCityFromHistory} = currentCitySlice.actions;

export default currentCitySlice.reducer;