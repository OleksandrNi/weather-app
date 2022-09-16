import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, HistoryCityState } from '../types'

const historyFromLocal: any = localStorage.getItem('historyCities');

const initialState: HistoryCityState = {
  history: JSON.parse(historyFromLocal) || [],
}

const historySlice = createSlice({
  name: 'history',
  initialState,
  reducers: {
    addCityInHistory(state, action: PayloadAction<City>) {
      if (!state.history.find(city => city.lat === action.payload.lat)) {
      state.history.unshift(action.payload);
      }
    },
    deleteCityInHistory(state, action: PayloadAction<string>) {
      state.history = state.history.filter(city => city.lat !== action.payload);
    }
  }
});

export const {addCityInHistory, deleteCityInHistory} = historySlice.actions;

export default historySlice.reducer;