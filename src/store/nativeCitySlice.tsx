import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface NativeCity {
  name: string;
  sys: {
    country: string
  };
  main: {
    feels_like: string;
    temp: number,
    humidity: number,
    pressure: number,
    temp_max: string;
    temp_min: string;
  }
  wind: {
    speed: number
  }
  weather: [{
    icon: string,
  }]
}

type NativeCityState = {
  nativeCity: NativeCity
}

const initialState: NativeCityState= {
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
    setNativeCity(state, action: PayloadAction<NativeCity>) {
      state.nativeCity = action.payload;
    },
  }
});

export const {setNativeCity} = nativeCitySlice.actions;

export default nativeCitySlice.reducer;