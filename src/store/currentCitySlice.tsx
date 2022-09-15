import { createSlice, PayloadAction } from '@reduxjs/toolkit';


type City = {
  country: string;
  name: string;
  lat: string;
  lng: string;
}

type CurrentCityState = {
  currentCity: City
}

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