import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { City, CurrentCityState } from '@types'

const initialState: CurrentCityState = {
  currentCity: {
    country: '',
    name: '',
    lat: '',
    lng: '',
  }
}

const currentCitySlice = createSlice({
  name: 'currentCity',
  initialState,
  reducers: {
    addCurrentCity(state, action: PayloadAction<City>) {
      state.currentCity = action.payload;
    },
    callCityFromHistory(state, action: PayloadAction<City>) {
      state.currentCity = action.payload;
    }
  }
});

export const {addCurrentCity, callCityFromHistory} = currentCitySlice.actions;

export default currentCitySlice.reducer;