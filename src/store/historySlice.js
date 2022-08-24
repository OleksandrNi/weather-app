import { createSlice } from '@reduxjs/toolkit';

const historySlice = createSlice({
  name: 'history',
  initialState: {
    history: JSON.parse(localStorage.getItem('historyCities')) || [],
  },
  reducers: {
    addCityInHistory(state, action) {
      if (!state.history.find(city => city.lat === action.payload.lat)) {
      state.history.push(action.payload)
      }
    },
    deleteCityInHistory(state, action) {
      state.history = state.history.filter(city => city.lat !== action.payload)
    }
  }
});

export const {addCityInHistory, deleteCityInHistory} = historySlice.actions;

export default historySlice.reducer;