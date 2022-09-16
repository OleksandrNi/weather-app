import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Weather, NativeWeatherState } from '../types'

const initialState: NativeWeatherState= {
  nativeCity: {
    name: '',
    sys: {
      country: ''
    },
    main: {
      feels_like: '',
      temp: 0,
      humidity: 0,
      pressure: 0,
      temp_max: '',
      temp_min: '',
    },
    wind: {
      speed: 0,
    },
    weather: [{
      icon: '',
    }],
  }
}


const nativeCitySlice = createSlice({
  name: 'nativeCity',
  initialState,
  reducers: {
    setNativeCity(state, action: PayloadAction<Weather>) {
      state.nativeCity = action.payload;
    },
  }
});

export const {setNativeCity} = nativeCitySlice.actions;

export default nativeCitySlice.reducer;